const { Router } = require("express");

const { getHandlerRating } = require("../handlers/getHandlerRating");
const {getUserCourseHandler} = require("../handlers/getUserCourseHandler")
const { postHandlerRating } = require("../handlers/postHandlerRating");
const {getHandlerCourseRating} = require("../handlers/getHandlerCourseRating")

const ratingRoutes = Router();


ratingRoutes.get("/userCourse", getUserCourseHandler)

ratingRoutes.get("/", getHandlerRating); //Trae todos los cursos ordenados x rating
ratingRoutes.get("/:id",getHandlerCourseRating); //Trae rating de un curso
ratingRoutes.post("/create", postHandlerRating);//Crea o modifica rating y comentario



module.exports = ratingRoutes;
