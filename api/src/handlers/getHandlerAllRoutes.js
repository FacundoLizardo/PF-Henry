const {
  getAllCoursesController,
} = require("../controllers/getControllers/getAllCoursesController");
const {
  getCourseByNameController,
} = require("../controllers/getControllers/getCourseByNameController");

const getHandlerAllRoutes = async (req, res) => {
  const { title } = req.query;
  try {
    const result = title
      ? await getCourseByNameController(title)
      : await getAllCoursesController();
    if (!result[0]) {
      return res.status(404).send("Curso no encontrado");
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getHandlerAllRoutes };
