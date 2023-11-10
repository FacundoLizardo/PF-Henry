const { Rating, Course } = require("../../db");
const { fn, col} = require("sequelize");

const getAllRatingsController = async () => {
  const courses = await Course.findAll({
    attributes: [
      "id",
      "title",
      [fn("AVG", col("Ratings.rating")), "averageRating"],
    ],
    include: [
      {
        model: Rating,
        attributes: ["id", "comment", "rating"],
      },
    ],
    group: ["Course.id", "Course.title", "Ratings.id"],
  });
  return courses.map((elemento) => {
    return elemento.dataValues;
  });
};

module.exports = { getAllRatingsController };
