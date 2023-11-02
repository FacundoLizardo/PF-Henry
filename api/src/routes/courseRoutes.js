const { Router } = require("express");

const { getHandlerAllRoutes } = require("../handlers/getHandlerAllRoutes");
const { getHandlerById } = require("../handlers/getHandlerById");
const { postHandlerCourse } = require("../handlers/postHandlerCourse");
const { putHandlerCourse } = require("../handlers/putHandlerCourse");

const courseRoutes = Router();

courseRoutes.get("/:id", getHandlerById);
courseRoutes.get("/", getHandlerAllRoutes);
courseRoutes.post("/create", postHandlerCourse);
courseRoutes.put("/edit", putHandlerCourse);

module.exports = courseRoutes;
