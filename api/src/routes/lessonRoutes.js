const { Router } = require("express");
const { postHandlerLessons } = require("../handlers/postHandlerLessons");
const { getHandlerLessonsByCourseId } = require("../handlers/getHandlerLessonsByCourseId");

const lessonRoutes = Router();

lessonRoutes.post("/create", postHandlerLessons);
lessonRoutes.get("/:course_id", getHandlerLessonsByCourseId);

module.exports = lessonRoutes;
