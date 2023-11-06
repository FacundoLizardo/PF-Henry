const { Lesson } = require("../../db");

const getLessonsByCourseIdController = async (course_id) => {
	const data = await Lesson.findAll({
		where: { course_id: course_id },
	});

	return data.map((elemento) => {
		return elemento.dataValues;
	});
};

module.exports = { getLessonsByCourseIdController };
