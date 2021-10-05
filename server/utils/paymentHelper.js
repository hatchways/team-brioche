const { differenceInHours } = require("./dateTimeHelper");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.checkoutCustomer = ({
  dogOwnerProfile,
  dogSitterProfile,
  cancelUrl,
  successUrl,
}) =>
  await stripe.checkout.sessions.create({
    mode: "payment",
    customer: dogOwnerProfile.customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "dog sitting",
          },
          unit_amount: dogSitterProfile.rate * 100,
        },
        quantity: differenceInHours(request.start, request.end),
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
