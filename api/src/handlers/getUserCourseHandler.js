const getUserCourseController = require("../controllers/getControllers/getUserCourseControler")

const getUserCourseHandler = async (req, res) => {
  const { userId, courseId, description} = req.body;

  if (!userId || !courseId) {
    return res.status(400).send("Faltan datos");
  }

  try {
    const userCourse = await getUserCourseController(
      userId,
      courseId
    );
    return res.status(200).json(userCourse);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserCourseHandler };