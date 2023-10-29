const { Router } = require("express");
// const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes");
// const getHandlerById = require("../handlers/getHandlerById");
// const postHandlerVideo = require("../handlers/postHandlerCourse");

const { courseRoutes } = require("./courseRoutes");
const { userRoutes } = require("./userRoutes");
const { ratingRoutes } = require("./ratingRoutes");
// const lessonRutes = require("./lessonRoutes");
// const paymentRoutes = require("./paymentRoutes");
// const consumptionRoutes = require("./consumptionRoutes");

const router = Router();

// getAll -> todos los cursos disponibles
//filtrado de cursos
//get x id
//post -> subir video

router.use("/courses", courseRoutes);
router.use("/users", userRoutes);
router.use("/rating", ratingRoutes);
// router.use("/lesson", lessonRutes);
// router.use("/payment", paymentRoutes);
// router.use("/consumption", consumptionRoutes);

/*
router.use("/educaStream", getHandlerAllRoutes); //todos los cursos disponibles
router.use("/educaStream/:id", getHandlerById); //curso por id
router.use("/educaStream", postHandlerVideo); //subida de video
*/

module.exports = router;
