const { Router } = require("express");
const {
	postCreateStripePayment,
} = require("../controllers/postControllers/postCreateStripePayment");
const { postHandlerEnrollment } = require("../handlers/postHandlerEnrollment");
const { getHandlerAllPayments } = require("../handlers/getHandlerAllPayments");

const stripeRoutes = Router();
stripeRoutes.post("/create-checkout-session", postCreateStripePayment);
stripeRoutes.post("/enrollment", postHandlerEnrollment);
stripeRoutes.get("/all", getHandlerAllPayments);

module.exports = stripeRoutes;
