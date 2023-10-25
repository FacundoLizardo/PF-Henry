const {Router} = require("express");
const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes");
const getHandlerById = require("../handlers/getHandlerById");
const postHandlerVideo = require("../handlers/postHandlerVideo");
const router = Router();

// getAll -> todos los cursos disponibles
//filtrado de cursos
//get x id
//post -> subir video

router.use("/educaStream", getHandlerAllRoutes); //todos los cursos disponibles
router.use("/educaStream/:id", getHandlerById); //curso por id
router.use("/educStream", postHandlerVideo); //subida de video

module.exports = router;
