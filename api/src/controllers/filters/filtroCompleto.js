const { Course, Lesson } = require('../../db');
const { Op } = require('sequelize');

const applyFilters = async (category, page, order, price, rating) => {
  const limit = 10; // Número de elementos por página
  const offset = (page - 1) * limit; // Cálculo del desplazamiento

  let whereClause = {}

  if (category) {
    whereClause.category = { [Op.iLike]: `%${category}%` };
  }

  if (rating) {
    whereClause.rating = { [Op.gte]: rating }; // Filtrar por cursos con rating igual o superior a "rating"
  }

  let filteredCourses = []

  if (order) {
    filteredCourses = await Course.findAll({
      where: whereClause,
      offset,
      order: [['name', order]],
      include: 
        { model: Lesson, as: "lesson"},
    });
  } else if (price) {
    filteredCourses = await Course.findAll({
      where: whereClause,
      offset,
      order: [['price', price]],
      include: 
          { model: Lesson, as: "lesson"},
    });
  } else {
    filteredCourses = await Course.findAll({
      where: whereClause,
      offset,
      include: 
          { model: Lesson, as: "lesson"},
    });
  }

  return filteredCourses;
}

module.exports = {applyFilters};


