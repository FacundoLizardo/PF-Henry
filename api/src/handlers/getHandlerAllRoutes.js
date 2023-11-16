const {
	getAllCoursesController,
} = require("../controllers/getControllers/getAllCoursesController");
const {
	getCourseByNameController,
} = require("../controllers/getControllers/getCourseByNameController");

const {
	getCourseByRatingController,
} = require("../controllers/getControllers/getCourseByRatingController");

const getHandlerAllRoutes = async (req, res) => {
	const arrayPropiedad = Object.keys(req.query);
	const propiedad = arrayPropiedad[0];
	const valorPropiedad = req.query[arrayPropiedad[0]];

	if (propiedad === "rating") {
		return await getCourseByRatingController(valorPropiedad);
	}

	try {
		const result = propiedad
			? await getCourseByNameController(propiedad, valorPropiedad)
			: await getAllCoursesController();
		if (!result[0]) {
			return res.status(200).send(false);
		}
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { getHandlerAllRoutes };
