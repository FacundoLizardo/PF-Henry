const axios = require("axios");
const { Course } = require("../../db");

const postCreateCourse = async (
  title,
  description,
  instructor_id,
  category
) => {
  try {
    const newCourse = await Course.create({
      title,
      description,
      instructor_id,
      category,
    });
    return newCourse;
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { postCreateCourse };
