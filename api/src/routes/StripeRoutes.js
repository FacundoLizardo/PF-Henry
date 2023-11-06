const { Router } = require("express");
const {
	postCreateStripePayment,
} = require("../controllers/postControllers/postCreateStripePayment");
const { postHandlerEnrollment } = require("../handlers/postHandlerEnrollment");

const stripeRoutes = Router();
stripeRoutes.post("/create-checkout-session", postCreateStripePayment);
stripeRoutes.post("/enrollment", postHandlerEnrollment);

module.exports = stripeRoutes;
