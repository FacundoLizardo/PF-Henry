const getLessonsByCourseIdController = require("../controllers/getControllers/getLessonsByCourseIdController");

const getHandlerLessonsByCourseId = async (req, res) => {
  const { course_id } = req.params;
  try {
    const lesson = await getLessonsByCourseIdController(course_id);
    return res.status(200).json(lesson);
  } catch (error) {
    return res
      .status(400)
      .json({ error: message.error + " El curso no existe" });
  }
};

module.exports = { getHandlerLessonsByCourseId };
