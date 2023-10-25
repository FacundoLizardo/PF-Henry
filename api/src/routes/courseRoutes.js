const {Router} = require("express")

const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes")
const getHandlerById = require("../handlers/getHandlerById")
const postHandlerVideo = require("../handlers/postHandlerVideo")

const courseRoutes = Router();

courseRoutes.get("/",getHandlerAllRoutes);
courseRoutes.get("/:course_id",getHandlerById);
courseRoutes.post("/",postHandlerVideo);

module.exports = courseRoutes