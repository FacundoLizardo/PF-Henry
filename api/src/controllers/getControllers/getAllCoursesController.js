
const { Course, Lesson } = require("../../db");
const axios = require("axios")

const getAllCoursesController = async () => {
  const data = await Course.findAll({
    include: {model: Lesson, as: "lesson"}, 
    where: { deletedAt: null },
  });

  return data.map((elemento) => {
    return elemento.dataValues;
  });

};

module.exports = getAllCoursesController;
