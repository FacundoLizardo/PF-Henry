const { Router } = require("express");
const { postHandlerLessons } = require("../handlers/postHandlerLessons");
const {
  getHandlerLessonsByCourseId,
} = require("../handlers/getHandlerLessonsByCourseId");
const { getHandlerLessonsById } = require("../handlers/getHandlerLessonsById");
const {putHandlerLessonsById} = require("../handlers/putHandlerLessonsById")

const lessonRoutes = Router();

lessonRoutes.post("/create", postHandlerLessons);
lessonRoutes.get("/:course_id", getHandlerLessonsByCourseId);
lessonRoutes.get("/lesson/:id", getHandlerLessonsById);
lessonRoutes.put("/edit", putHandlerLessonsById)

module.exports = lessonRoutes;
