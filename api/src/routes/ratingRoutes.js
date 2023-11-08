const { Router } = require("express");

const { getHandlerRating } = require("../handlers/getHandlerRating");
const {getUserCourseHandler} = require("../handlers/getUserCourseHandler")
const { postHandlerRating } = require("../handlers/postHandlerRating");

const ratingRoutes = Router();

ratingRoutes.get("/", getHandlerRating);
ratingRoutes.get("/userCourse", getUserCourseHandler)
ratingRoutes.post("/create", postHandlerRating);

module.exports = ratingRoutes;
