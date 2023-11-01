const { Router } = require("express");

const { getHandlerAllRoutes } = require("../handlers/getHandlerAllRoutes");
const { getHandlerById } = require("../handlers/getHandlerById");
const { postHandlerCourse } = require("../handlers/postHandlerCourse");

const courseRoutes = Router();

courseRoutes.get("/:id", getHandlerById);
courseRoutes.get("/", getHandlerAllRoutes);
courseRoutes.post("/create", postHandlerCourse);

module.exports = courseRoutes;
