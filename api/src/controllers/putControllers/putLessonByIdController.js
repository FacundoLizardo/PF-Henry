const { Lesson } = require("../../db");

const putLessonByIdController = async (
  id,
  title,
  description,
  images,
  video_url,
  duration,
  sequence_order
) => {
  const lessonsUpdated = await Lesson.update(
    { title, description, images, video_url, duration, sequence_order },
    { where: { id: id } }
  );

  return lessonsUpdated
};

module.exports = { putLessonByIdController };
