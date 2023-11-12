const { Course, Lesson } = require("../../db");

const postCreateLesson = async (
	title,
	description,
	CourseId,
	video_url,
	duration,
	section,
	enabled
) => {
	const existeCurso = await Course.findByPk(CourseId);
	if (!existeCurso) {
		return "Curso/Usuario inexistente";
	}
	// Busca una lección existente con los mismos atributos
	const existingLesson = await Lesson.findOne({
		where: {
			title,
			CourseId,
			section,
		},
	});
	const wasLook = false;
	if (existingLesson) {
		return "La lección ya existe";
	}
	const newLesson = await Lesson.create({
		title,
		description,
		video_url,
		wasLook,
		duration,
		section,
		enabled,
		CourseId,
	});

	await newLesson.setCourse(CourseId);
	return newLesson;
};

module.exports = { postCreateLesson };
