const { Rating, Course, User } = require("../../db");

const postCreateRating = async (course_id, user_id, rating, comment) => {
  const existeCurso = await Course.findByPk(course_id);
  const existeUsuario = await User.findByPk(user_id);

  if (!existeCurso || !existeUsuario) {
    return "Curso/Usuario inexistente";
  }

  const [newRating, created] = await Rating.findOrCreate({
    where: { course_id: course_id, user_id: user_id },
    defaults: { course_id, user_id, rating, comment },
  });

  if (created) {
    return newRating;
  } else {
    await Rating.update(
      { rating: rating },
      { where: { course_id: course_id, user_id: user_id } }
    );
    return (`Rating actualizado a ${rating}`)
  }
};

module.exports = { postCreateRating };
