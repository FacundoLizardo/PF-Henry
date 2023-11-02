const {
	getUserController,
} = require("../controllers/getControllers/getUserController");

const getHandlerUser = async (req, res) => {
	const { email } = req.query;

	if (email) {
		const user = await getUserController(email);
		return res.status(200).json(user);
	} else {
		return res.status(400).json({
			error:
				error.message + "No se envio correctamente la informacion al servidor",
		});
	}
};

module.exports = { getHandlerUser };
