const { Course, Lesson } = require("../../db");

const getCourseByIdController = async (id) => {
	const { dataValues } = await Course.findByPk(id, {
		include: { model: Lesson, as: "lesson" },
		where: { deletedAt: null },
	});
	console.log(dataValues);
	return dataValues;
};

module.exports = { getCourseByIdController };
