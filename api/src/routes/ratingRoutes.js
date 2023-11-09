const { Router } = require("express");

const { getHandlerRating } = require("../handlers/getHandlerRating");
const {getUserCourseHandler} = require("../handlers/getUserCourseHandler")
const { postHandlerRating } = require("../handlers/postHandlerRating");

const ratingRoutes = Router();


ratingRoutes.get("/userCourse", getUserCourseHandler)

ratingRoutes.get("/", getHandlerRating); //Trae todos los cursos ordenados x rating
ratingRoutes.get("/ratingCourse"); //Trae rating de un curso
ratingRoutes.post("/create", postHandlerRating);//Crea o modifica rating y comentario



module.exports = ratingRoutes;
