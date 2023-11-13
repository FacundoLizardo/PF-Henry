const { Router } = require("express");
// const getHandlerAllRoutes = require("../handlers/getHandlerAllRoutes");
// const getHandlerById = require("../handlers/getHandlerById");
// const postHandlerVideo = require("../handlers/postHandlerCourse");

const { courseRoutes } = require("./courseRoutes");
const { userRoutes } = require("./userRoutes");
const { ratingRoutes } = require("./ratingRoutes");
const { onSaleRoutes } = require("./onSaleRoutes");
const { lessonRutes } = require("./lessonRoutes");
// const paymentRoutes = require("./paymentRoutes");
// const consumptionRoutes = require("./consumptionRoutes");

const router = Router();

router.use("/onSale", onSaleRoutes);
router.use("/courses", courseRoutes);
router.use("/users", userRoutes);
router.use("/rating", ratingRoutes);
router.use("/lesson", lessonRutes);
// router.use("/payment", paymentRoutes);
// router.use("/consumption", consumptionRoutes);

module.exports = router;
