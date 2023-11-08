const {
	putCourseController,
} = require("../controllers/putControllers/putCourseController");

const putHandlerCourse = async (req, res) => {
	const { id, title, category, description, image, price, enabled } = req.body;

	try {
		console.log(id + "     estoy en el handler");
		console.log(enabled);
		const response = await putCourseController(
			id,
			title,
			category,
			description,
			image,
			price,
			enabled
		);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({
			error:
				error.message + "No se envio correctamente la informacion al servidor",
		});
	}
};

module.exports = { putHandlerCourse };
