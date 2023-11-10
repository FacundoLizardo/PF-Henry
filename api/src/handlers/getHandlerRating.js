const {
  getAllRatingsController,
} = require("../controllers/getControllers/getAllRatingsController");

const getHandlerRating = async (req, res) => {
  try {
    const courses = await getAllRatingsController();

    courses.forEach((curso) => {
      const totalRatings = curso.Ratings.length;
      const sumRatings = curso.Ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

      curso.averageRating = averageRating;
    });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getHandlerRating };
