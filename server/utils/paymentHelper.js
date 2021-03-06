const { differenceInHours } = require("./dateTimeHelper");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createCustomer = async (profile) => {
  const customer = await stripe.customers.create({
    address: { city: profile.address },
    email: profile.userId.email,
    name: `${profile.firstName} ${profile.lastName}`,
  });
  if (!customer)
    throw new Error("Unable to create customer please try again later");

  profile.customerId = customer.id;
  await profile.save();
  return profile;
};

module.exports.createPaymentIntent = async (
  dogsitterProfile,
  dogOwnerProfile,
  start,
  end
) => {
  const amount = dogsitterProfile.rate * differenceInHours(start, end);

  const { invoice_settings: invoice } = await stripe.customers.retrieve(
    dogOwnerProfile.customerId
  );

  return await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    customer: dogOwnerProfile.customerId,
    payment_method: invoice.default_payment_method,
  });
};

async function getPaymentMethods(profile) {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: profile.customerId,
    type: "card",
  });

  return paymentMethods.data.map((method) => {
    const { id, card, billing_details: billingDetails } = method;
    return {
      id,
      brand: card.brand,
      last4: card.last4,
      email: billingDetails.email,
      expMonth: card.exp_month,
      expYear: card.exp_year,
      name: billingDetails.name,
    };
  });
}

module.exports.getPaymentMethods = getPaymentMethods;
