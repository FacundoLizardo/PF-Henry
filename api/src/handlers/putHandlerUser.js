const {
	putUserController,
} = require("../controllers/getControllers/getUserController");

const putHandlerUser = async (req, res) => {
	const { id, user_name, first_name, last_name, photoURL, birthdate } =
		req.body;
	if (id) {
		const partesFecha = birthdate.split("/");
		const dia = partesFecha[0];
		const mes = partesFecha[1];
		const anio = partesFecha[2];
		const fechaFormateada = `${anio}-${mes}-${dia}`;
		const isNew = false;
		const updatedUser = await putUserController({
			id: id,
			user_name: user_name,
			first_name: first_name,
			last_name: last_name,
			birthdate: fechaFormateada,
			photoURL: photoURL,
			isNew: false,
		});

		return res.status(200).json(updatedUser);
	} else {
		return res.status(400).json({
			error:
				error.message + "No se envio correctamente la informacion al servidor",
		});
	}
};

module.exports = { putHandlerUser };
