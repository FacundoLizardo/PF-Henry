const {
  postCreateRating,
} = require("../controllers/postControllers/postCreateRating");

const postHandlerRating = async (req, res) => {
  const { course_id, user_id, rating, comment } = req.body;
  
  if (!course_id || !user_id || !rating || !comment) {
    return res.status(400).json({ error: "Datos insuficientes" });
  }

  try {
    const newRating = await postCreateRating(
      course_id,
      user_id,
      rating,
      comment
    );
    return res.status(200).json(newRating);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};
module.exports = { postHandlerRating };
