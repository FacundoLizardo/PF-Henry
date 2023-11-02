const putHandlerLessonsById = async (req, res) => {
    const {
        id,
        title,
        description,
        //course_id,
        images,
        video_url,
        duration,
        sequence_order,
      } = req.body;
    
      if (
        !id ||
        !title ||
        !description ||
        //!course_id ||
        !images ||
        !video_url ||
        !duration ||
        !sequence_order
      ) {
        return res.status(404).json({ error: "No guardado - Faltan datos" });
      }

  try {
    const lesson = await getLessonByIdController(id);

  } catch (error) {

  }
};

module.exports = { putHandlerLessonsById };
