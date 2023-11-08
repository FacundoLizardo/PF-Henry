const { Course, Lesson } = require("../../db");

const postCreateLesson = async (
	title,
	description,
	CourseId,
	video_url,
	duration,
	section,
	sequence_order,
	enabled
) => {
	const existeCurso = await Course.findByPk(CourseId);
	if (!existeCurso) {
		return "Curso/Usuario inexistente";
	}
	console.log(
		title,
		description,
		video_url,
		CourseId,
		section,
		duration,
		sequence_order,
		enabled
	);
	// Busca una lección existente con los mismos atributos
	const existingLesson = await Lesson.findOne({
		where: {
			title,
			CourseId,
			section,
		},
	});

	if (existingLesson) {
		return "La lección ya existe";
	}
	const newLesson = await Lesson.create({
		title,
		description,
		CourseId,
		video_url,
		duration,
		sequence_order,
		section,
		enabled,
		wasLook,
	});

	await newLesson.setCourse(CourseId);
	return newLesson;
};

module.exports = { postCreateLesson };
