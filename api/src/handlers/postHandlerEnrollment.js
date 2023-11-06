const {
	postEnrollmentController,
} = require("../controllers/postControllers/postEnrollmentController");
const { sendEmailBuy } = require("./../utils/mailing");

const postHandlerEnrollment = async (req, res) => {
	const { cart, id, email } = req.body;
	if (!cart || !id || !email) {
		res.status(404).json({ error: "Lack Of Data" });
	}
	try {
		sendEmailBuy(email, cart)
			.then(() => console.log("Este es el success"))
			.catch(() => console.log("Este es el error"));
		const enrollment = await postEnrollmentController(cart, id);
		console.log(cart);
		console.log(email);
		res.status(200).send(enrollment);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	} finally {
	}
};

module.exports = { postHandlerEnrollment };
