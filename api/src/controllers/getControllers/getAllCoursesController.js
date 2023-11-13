const { Course, Lesson, Rating } = require("../../db");

const getAllCoursesController = async () => {
	const data = await Course.findAll({
		include: [
			{ model: Lesson, as: "lesson" },
			{ model: Rating, as: "ratings" },
		],
	});
	return data.map((elemento) => {
		return elemento.dataValues;
	});
};

module.exports = { getAllCoursesController };
