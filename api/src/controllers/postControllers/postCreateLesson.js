const { Course, Lesson } = require("../../db");

const postCreateLesson = async (
  title,
  description,
  course_id,
  images,
  video_url,
  duration,
  sequence_order
) => {
  const existeCurso = await Course.findByPk(course_id, {
    where: { deletedAt: null },
  });
  if (!existeCurso) {
    return "Curso/Usuario inexistente";
  }

  const [newLesson, created] = await Lesson.findOrCreate({
    where: {
      course_id: course_id,
      sequence_order: sequence_order,
      deletedAt: null,
    },
    defaults: {
      title,
      description,
      course_id,
      images,
      video_url,
      duration,
      sequence_order,
    },
  });

  if (created) {
    await newLesson.setCourse(course_id);
    return newLesson;
  } else {
    return "La leccion ya existe";
  }
};

module.exports = { postCreateLesson };
