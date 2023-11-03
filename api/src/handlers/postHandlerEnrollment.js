const {
	postEnrollmentController,
} = require("../controllers/postControllers/postEnrollmentController");

const postHandlerEnrollment = async (req, res) => {
	const { cart, id } = req.body;
	if (!cart || !id) {
		return res.status(404).json({ error: "Lack Of Data" });
	}
	try {
		const enrollment = await postEnrollmentController(cart, id);
		return res.status(200).send(enrollment);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerEnrollment };
