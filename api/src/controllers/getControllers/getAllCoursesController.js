const { Course, Lesson } = require("../../db");

const getAllCoursesController = async () => {
	const data = await Course.findAll({
		include: { model: Lesson, as: "lesson" },
	});

	return data.map((elemento) => {
		return elemento.dataValues;
	});
};

module.exports = { getAllCoursesController };
