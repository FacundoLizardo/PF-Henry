const { Rating } = require("../../db");

const getCourseByRatingController = async (id) => {
  const { dataValues } = await Rating.findByPk(id);
  return dataValues;
};

module.exports = { getCourseByRatingController };
