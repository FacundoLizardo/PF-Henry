require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPEKEY);
// const url = process.env.FRONTEND_URL;

const postCreateStripePayment = async (req, res) => {
	const line_items = req.body.cartItems.map((item) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: item.name,
					images: [item.image],
					description: item.description,
					metadata: {
						id: item.id,
					},
				},
				unit_amount: item.price * 100,
			},
			quantity: 1,
		};
	});

	const payment = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items,
		mode: "payment",
		success_url: "http://localhost:5173/payment/checkout/sucess",
		cancel_url: "http://localhost:5173/payment/checkout/cancel",
		//success_url: `${url}/payment/checkout/sucess`,
		//cancel_url: `${url}/payment/checkout/cancel`,
	});

	res.status(200).send({ url: payment.url, payment: payment.id });
};

module.exports = { postCreateStripePayment };
