const {Router} = require("express");
const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes");
const getHandlerById = require("../handlers/getHandlerById");
const postHandlerVideo = require("../handlers/postHandlerVideo");
const router = Router();

// getAll -> todos los cursos disponibles
//filtrado de cursos
//get x id
//post -> subir video

router.use("/educaStream", getHandlerAllRoutes)
router.use("/educaStream/:id", getHandlerById)
router.use("/educStream", postHandlerVideo)

module.exports = router;
