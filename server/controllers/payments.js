const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Profile = require("../models/Profile");
const { createCustomer, getPaymentMethods } = require("../utils/paymentHelper");

//@route POST /payment-methods
//@desc returns the list payment methods attached to a customer
//access private
module.exports.getListOfPaymentMethods = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOne({ userId: id });

  if (!profile)
    return res
      .status(404)
      .json({ message: "No profile found. Please create a profile." });

  if (!profile.customerId)
    return res
      .status(200)
      .json({ paymentMethods: [], defaultPaymentMethod: "" });

  const paymentMethods = await getPaymentMethods(profile);

  const customer = await stripe.customers.retrieve(profile.customerId);
  let defaultPaymentMethod = customer.invoice_settings.default_payment_method;

  if (!defaultPaymentMethod) {
    defaultPaymentMethod = paymentMethods[0].id;
    await stripe.customers.update(profile.customerId, {
      invoice_settings: { default_payment_method: defaultPaymentMethod },
    });
  }

  res.status(200).json({ paymentMethods, defaultPaymentMethod });
});

//@route POST /add-payment-method
//@desc Generates a client secret for adding a payment method to customer if one exists, if one does not exist, first creates a customer
//access private
module.exports.addPaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOne({ userId: id }).populate("userId", {
    email: 1,
  });
  if (id) return res.send(profile, id);
  if (!profile)
    return res
      .status(404)
      .json({ message: "No profile found. Please create a profile." });

  if (!profile.customerId) {
    try {
      createCustomer(profile);
    } catch (error) {
      return res.status(500).json({
        message:
          "An error occured while accessing stripe. Please try again later",
      });
    }
  }

  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ["card"],
    customer: profile.customerId,
  });
  const { firstName, lastName, userId } = profile;
  const attachedDetails = {
    name: `${firstName} ${lastName}`,
    email: userId.email,
  };
  res
    .status(200)
    .json({ clientSecret: setupIntent.client_secret, attachedDetails });
});

//@route POST /set-default-method/:methodId
//@desc sets the default Payment method
//access private
module.exports.setDefaultPaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const methodId = req.params.methodId;

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(methodId);
    if (!paymentMethod.id) throw new Error();
  } catch (error) {
    res.status(400).json({ message: "invalid payment method Id" });
  }

  const profile = await Profile.findOne({ userId: id });

  if (!profile)
    return res
      .status(404)
      .json({ message: "No profile found. Please create a profile." });

  if (!profile.customerId)
    return res
      .status(404)
      .json({ message: "Please add a payment method to your profile" });

  await stripe.customers.update(profile.customerId, {
    invoice_settings: { default_payment_method: methodId },
  });

  res.sendStatus(200);
});
