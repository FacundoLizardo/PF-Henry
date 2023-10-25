const {Router} = require("express")

const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes")
const getHandlerById = require("../handlers/getHandlerById")
const postHandlerCourse = require("../handlers/postHandlerCourse")

const courseRoutes = Router();

courseRoutes.get("/",getHandlerAllRoutes);
courseRoutes.get("/:course_id",getHandlerById);
courseRoutes.post("/",postHandlerCourse);

module.exports = courseRoutes