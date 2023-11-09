const {
	postEnrollmentController,
} = require("../controllers/postControllers/postEnrollmentController");
const { sendEmailBuy } = require("./../utils/mailing");

const postHandlerEnrollment = async (req, res) => {
	const { cart, id, email, id_payment } = req.body;
	if (!cart || !id || !email || !id_payment) {
		res.status(404).json({ error: "Lack Of Data" });
	}
	try {
		await sendEmailBuy(email, cart);
		const enrollment = await postEnrollmentController(cart, id, id_payment);
		return res.status(200).json({ enrollment });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerEnrollment };
