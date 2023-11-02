const { Course, Lesson } = require("../../db");

const getAllCoursesController = async () => {
  const data = await Course.findAll({
    where: { deletedAt: null },
    include: [{ model: Lesson, as: "lesson", attributes:["id","title"] }],
  });

  return data.map((elemento) => {
    return elemento.dataValues;
  });
};

module.exports = { getAllCoursesController };
