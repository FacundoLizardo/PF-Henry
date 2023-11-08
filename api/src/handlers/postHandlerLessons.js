const {
	postCreateLesson,
} = require("../controllers/postControllers/postCreateLesson");
const { getVideoDurationInSeconds } = require("get-video-duration");

const postHandlerLessons = async (req, res) => {
	const { title, description, video_url, CourseId, section } = req.body;

	const duration = await getVideoDurationInSeconds(video_url).then(
		(duration) => {
			return Math.floor(duration);
		}
	);
	const enabled = true;
	if (!title || !description || !video_url || !duration || !CourseId) {
		return res.status(404).json({ error: "No guardado - Faltan datos" });
	}

	try {
		const newLesson = await postCreateLesson(
			title,
			description,
			CourseId,
			video_url,
			duration,
			Number(section),
			enabled
		);
		return res.status(200).json(newLesson);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerLessons };
