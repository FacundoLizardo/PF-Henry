const { Category } = require("../../db");

const getAllCategoriesController = async () => {
  try {
    const data = await Category.findAll({ where: { deletedAt: null } });

    const totalData = data.map((category) => category.dataValues);

    return totalData;
  } catch (error) {
    return error;
  }
};
module.exports = { getAllCategoriesController };

//SELECT c.id AS "ID del Curso", c.title AS "Nombre del Curso", l.id AS "ID de la Lección", l.title AS "Nombre de la Lección" FROM Course c JOIN Lesson l ON c.id = l.id;
