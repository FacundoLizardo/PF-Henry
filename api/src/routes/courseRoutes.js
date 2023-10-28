const { Router } = require("express");

const { getHandlerAllRoutes } = require("../handlers/getHandlerAllRoutes");
const { getHandlerById } = require("../handlers/getHandlerById");
const { postHandlerCourse } = require("../handlers/postHandlerCourse");

const courseRoutes = Router();

courseRoutes.get("/", getHandlerAllRoutes);
courseRoutes.get("/:id", getHandlerById);
courseRoutes.post("/create", postHandlerCourse);

module.exports = courseRoutes;
