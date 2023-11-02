const {
  postCreateLesson,
} = require("../controllers/postControllers/postCreateLesson");

const postHandlerLessons = async (req, res) => {
  const {
    title,
    description,
    course_id,
    images,
    video_url,
    duration,
    sequence_order,
  } = req.body;

  if (
    !title ||
    !description ||
    !course_id ||
    !images ||
    !video_url ||
    !duration ||
    !sequence_order
  ) {
    return res.status(404).json({ error: "No guardado - Faltan datos" });
  }

  try {
    const newLesson = await postCreateLesson(
      title,
      description,
      course_id,
      images,
      video_url,
      duration,
      sequence_order
    );
    return res.status(200).json(newLesson);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { postHandlerLessons };
