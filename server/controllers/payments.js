const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Profile = require("../models/Profile");
const mongoose = require("mongoose");

//@route POST /payments/create-customer/:profileId
//@desc creates a stripe customer and adds the customerId to the profile model
//access private
module.exports.createCustomer = asyncHandler(async (req, res) => {
  const { profileId } = req.params;

  if (!mongoose.isValidObjectId(profileId))
    return res.status(400).json({ message: "Invalid Profile Id" });

  const profile = await Profile.findOne({ _id: profileId });

  if (!profile)
    return res
      .status(404)
      .json({ message: "No profile is found with this id" });

  if (profile.customerId)
    return res
      .status(400)
      .json({ message: "A customer Object already exists for this profile" });

  let customer;
  try {
    customer = await stripe.customers.create({
      address: { city: profile.address },
      email: profile.userId.email,
      name: `${profile.firstName} ${profile.lastName}`,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "An error occured while accessing stripe. Please try again later",
    });
  }

  profile.customerId = customer.id;
  await profile.save();

  res.status(200).json({ profile });
});
