const { Lesson } = require("../../db");

const getLessonByIdController = async (id) => {
	const { dataValues } = await Lesson.findByPk(id);
	return dataValues;
};

module.exports = { getLessonByIdController };
