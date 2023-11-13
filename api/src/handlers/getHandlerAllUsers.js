const {
	getAllUsersController,
} = require("../controllers/getControllers/getAllUsersController");

const getHandlerAllUser = async (req, res) => {
	try {
		const users = await getAllUsersController();
		if (users) {
			return res.status(200).json(users);
		} else {
			return res.status(404).json({
				error: "Error al traer todos los usuarios",
			});
		}
	} catch (error) {
		return res.status(400).json({
			error: "No se envió correctamente la información al servidor",
		});
	}
};

module.exports = { getHandlerAllUser };
