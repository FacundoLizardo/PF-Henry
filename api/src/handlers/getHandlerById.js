const getCourseByIdController = require("../controllers/getControllers/getCourseByIdController");

const getHandlerById = async (res, req) => {
  const { course_id } = req.params;
  try {
    const course = await getCourseByIdController(course_id);
    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getHandlerById };
