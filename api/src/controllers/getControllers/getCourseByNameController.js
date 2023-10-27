const { Op } = require("sequelize");
const { Course, Lesson } = require("../../db");

const getCourseByNameController = async (title) => {
  const courses = await Course.findAll({
    where: {
      title: { [Op.iLike]: `%${title}%` },
      deletedAt: null,
    },
    include: { model: Lesson, as: "lesson" },
  });

  return courses.map((elemento) => {
    return elemento.dataValues;
  });
};

module.exports = { getCourseByNameController };
