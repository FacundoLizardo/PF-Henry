const { Rating, Course, User } = require("../../db");

const postCreateRating = async (course_id, user_id, rating, comment) => {
  const existeCurso = await Course.findByPk(course_id);
  const existeUsuario = await User.findByPk(user_id);
  if (!existeCurso || !existeUsuario) {
    return res.status(404).send("Curso/Usuario inexistente");
  }
  const newRating = Rating.create(course_id, user_id, rating, comment);
  return newRating;
};

module.exports = { postCreateRating };
