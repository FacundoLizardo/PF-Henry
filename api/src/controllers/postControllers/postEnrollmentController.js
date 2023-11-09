const { User, Course, Payment } = require("../../db");

const postEnrollmentController = async (cart, id, id_payment) => {
	const user = await User.findOne({ where: { id: id } });

	let results = [];
	for (i = 0; i < cart?.length; i++) {
		const course = await Course.findOne({ where: { id: cart[i].id } });
		const date = new Date();
		const payment = await Payment.create({
			payment_id: id_payment,
			amount: course.dataValues.price,
			payment_status: "Complete",
			payment_date: date,
			payment_method: "Card",
		});

		const coursePay = await course.addPayment(payment);
		const userPay = await user.addPayment(payment);
		results.push(coursePay);
	}
	return results;
};

module.exports = { postEnrollmentController };
