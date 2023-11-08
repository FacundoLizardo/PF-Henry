const { Course, Rating, User } = require("../../db");
const { Op, Sequelize } = require("sequelize");

const checkUserCourseRelation = async (userId, courseId) => {
  try {
    const user = await User.findOne({
      where: { id: userId, enabled: true },
      include: Course,
    });

    if (!user) {
      return false;
    }

    const course = await Course.findOne({
      where: { id: courseId, enabled: true },
    });

    if (!course) {
      return false;
    }

    const isRelated = await user.hasCourse(course);

    if (isRelated) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserCourseController = async (userId, courseId) => {
  const relation = await checkUserCourseRelation(userId, courseId);
  if (!relation) {
    return res.status(400).send("Relacion Usuario/Curso inexistente");
  }
  const {dataValues} = await User.findByPk(userId, {
    include: {
      model: Course,
      through: { attributes: [] },
      where: {id: courseId}
    },
  })

  return dataValues.Course
};

module.exports = { getUserCourseController };
