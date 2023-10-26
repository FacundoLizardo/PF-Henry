//const getAllCoursesController = require("../controllers/getControllers/getAllCoursesController");
const getAllCoursesController = require("../controllers/getControllers/getAllCoursesController");
const getCourseByNameController = require("../controllers/getControllers/getCourseByNameController");

const getHandlerAllRoutes = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name
      ? await getCourseByNameController(name)
      : await getAllCoursesController();
    if (!result[0]) {
      return res.status(404).send("Curso no encontrado");
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {getHandlerAllRoutes};
