const {
  getCourseByIdController,
} = require("../controllers/getControllers/getCourseByIdController");

const getHandlerLessonsByCourseId = async (req, res) => {
  const { course_id } = req.params;
  try {
    const lessons = await getCourseByIdController(course_id);
    return res.status(200).json(lessons.lesson);
  } catch (error) {
    return res
      .status(400).send("Inexistente");
  }
};

module.exports = { getHandlerLessonsByCourseId };