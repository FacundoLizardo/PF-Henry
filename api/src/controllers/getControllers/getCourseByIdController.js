const { Course, Lesson, Rating } = require("../../db");

const getCourseByIdController = async (id) => {
	const course = await Course.findByPk(id, {
		include: [
			{ model: Lesson, as: "lesson" },
			{ model: Rating, as: "ratings" },
		],
	});

	if (course) {
		return course.dataValues;
	} else {
		return null;
	}
};

module.exports = { getCourseByIdController };
