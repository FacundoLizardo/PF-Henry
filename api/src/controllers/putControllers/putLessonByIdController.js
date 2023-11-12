const { Lesson } = require("../../db");

const putLessonByIdController = async (
	id,
	title,
	description,
	video_url,
	duration,
	section
) => {
	const lessonsUpdated = await Lesson.update(
		{ title, description, video_url, duration, section },
		{ where: { id: id } }
	);

	return lessonsUpdated;
};

module.exports = { putLessonByIdController };
