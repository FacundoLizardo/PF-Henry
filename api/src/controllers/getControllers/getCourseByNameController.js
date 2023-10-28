const { Op } = require("sequelize");
const { Course, Lesson } = require("../../db");

const getCourseByNameController = async (propiedad, valorPropiedad) => {
  const courses = await Course.findAll({
    where: {
      [propiedad]: { [Op.iLike]: `%${valorPropiedad}%` },
      deletedAt: null,
    },
    include: { model: Lesson, as: "lesson" },
  });

  return courses.map((elemento) => {
    return elemento.dataValues;
  });
};

module.exports = { getCourseByNameController };
