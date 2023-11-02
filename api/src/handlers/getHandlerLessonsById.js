const {
  getLessonByIdController,
} = require("../controllers/getControllers/getLessonByIdController");

const getHandlerLessonsById = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await getLessonByIdController(id);
    return res.status(200).json(lesson);
  } catch (error) {
    return res
      .status(400).send("La lección no existe");
  }
};

module.exports = { getHandlerLessonsById };
