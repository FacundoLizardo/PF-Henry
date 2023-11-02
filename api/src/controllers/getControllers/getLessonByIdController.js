const { Lesson } = require("../../db");

const getLessonByIdController = async (id) => {
  const { dataValues } = await Lesson.findByPk(id, {
    where: { deletedAt: null },
  });
  return dataValues;
};

module.exports = { getLessonByIdController };
