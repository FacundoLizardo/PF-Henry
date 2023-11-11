const {
	getUserController,
} = require("../controllers/getControllers/getUserController");
const { getUserControllerId } = require("../controllers/getControllers/getUserControllerId");

const getHandlerUser = async (req, res) => {
	const { email, id } = req.query;

	if (email || id) {
		let user;

		if (email) {
			user = await getUserController(email);
		} else if (id) {
			user = await getUserControllerId(id);
		}

		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(404).json({
				error: "Usuario no encontrado",
			});
		}
	} else {
		return res.status(400).json({
			error: "No se envió correctamente la información al servidor",
		});
	}
};

module.exports = { getHandlerUser };
