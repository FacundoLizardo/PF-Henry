const {
	getCourseByIdController,
} = require("../controllers/getControllers/getCourseByIdController");

const getHandlerById = async (req, res) => {
	const { id } = req.params;
	try {
		const course = await getCourseByIdController(id);
		return res.status(200).json(course);
	} catch (error) {
		return res
			.status(400)
			.json({ error: error.message + " El curso no existe" });
	}
};

module.exports = { getHandlerById };
