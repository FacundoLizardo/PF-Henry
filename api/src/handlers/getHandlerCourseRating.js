const {
  getCourseByRatingController,
} = require("../controllers/getControllers/getCourseByRatingController");

const getHandlerCourseRating = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await getCourseByRatingController(id);
    return res.status(200).json(rating);
  } catch (error) {
    return res.status(400).send("El rating no existe");
  }
};

module.exports = { getHandlerCourseRating };
