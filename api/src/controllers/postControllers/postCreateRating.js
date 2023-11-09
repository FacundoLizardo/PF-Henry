const { Rating, Course, User } = require("../../db");

const postCreateRating = async (course_id, user_id, rating, comment) => {
  const existeCurso = await Course.findByPk(course_id);
  const existeUsuario = await User.findByPk(user_id);

  if (!existeCurso || !existeUsuario) {
    return "Curso/Usuario inexistente";
  }

  const [newRating, created] = await Rating.findOrCreate({
    where: { CourseId: course_id, UserId: user_id },
    defaults: { rating, comment },
  });

  if (created) {
    await newRating.setUser(user_id);
    await newRating.setCourse(course_id);
    return newRating;
  } else {
    await Rating.update(
      { rating: rating, comment:comment },
      { where: { CourseId: course_id, UserId: user_id } }
    );
    return (`Rating actualizado a ${rating}`)
  }
};

module.exports = { postCreateRating };
