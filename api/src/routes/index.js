const { Router } = require("express");
// const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes");
// const getHandlerById = require("../handlers/getHandlerById");
// const postHandlerVideo = require("../handlers/postHandlerCourse");

const courseRoutes = require("./courseRoutes");
// const lessonRutes = require("./lessonRoutes");
const userRoutes = require("./userRoutes");
// const paymentRoutes = require("./paymentRoutes");
// const ratingRoutes = require("./ratingRoutes");
// const consumptionRoutes = require("./consumptionRoutes");

const router = Router();

router.use("/courses", courseRoutes);
// router.use("/lesson", lessonRutes);
router.use("/users", userRoutes);
// router.use("/payment", paymentRoutes);
// router.use("/rating", ratingRoutes);
// router.use("/consumption", consumptionRoutes);


module.exports = router;
