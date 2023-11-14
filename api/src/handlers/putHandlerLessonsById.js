const {
	putLessonByIdController,
} = require("../controllers/putControllers/putLessonByIdController");

const putHandlerLessonsById = async (req, res) => {
	const { id, title, description, video_url, duration, section } = req.body;

	console.log(req.body);
	if (!id || !title || !description || !video_url || !duration || !section) {
		return res.status(404).json({ error: "No guardado - Faltan datos" });
	}

	try {
		const lessonsUpdated = await putLessonByIdController(
			id,
			title,
			description,
			video_url,
			duration,
			section
		);

		if (lessonsUpdated > 0) {
			return res.status(200).json(lessonsUpdated);
		} else {
			return res.status(400).send("Leccion no actualizada");
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { putHandlerLessonsById };
