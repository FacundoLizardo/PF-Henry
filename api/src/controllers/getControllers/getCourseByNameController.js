const { Op } = require("sequelize");
const { Course, Lesson } = require("../../db");

const getCourseByNameController = async (propiedad, valorPropiedad) => {
  let condicion;

  if (propiedad === "category") {
    condicion = { [Op.eq]: valorPropiedad };
  } else {
    condicion = { [Op.iLike]: `%${valorPropiedad}%` };
  }

  const courses = await Course.findAll({
    where: {
      [propiedad]: condicion,
      deletedAt: null,
    },
    include: { model: Lesson, as: "lesson" },
  });

  return courses.map((elemento) => {
    return elemento.dataValues;
  });
};

module.exports = { getCourseByNameController };
