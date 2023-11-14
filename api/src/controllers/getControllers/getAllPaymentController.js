const { Payment, User } = require("../../db");

const getAllPaymentController = async () => {
	try {
		const payments = await Payment.findAll({
			include: [{ model: User }],
		});

		return payments;
	} catch (error) {
		return error;
	}
};
module.exports = { getAllPaymentController };
