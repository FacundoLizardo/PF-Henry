const { Router } = require("express");

const { getHandlerRating } = require("../handlers/getHandlerRating");
const { postHandlerRating } = require("../handlers/postHandlerRating");

const ratingRoutes = Router();

ratingRoutes.get("/", getHandlerRating);
ratingRoutes.post("/create", postHandlerRating);

module.exports = ratingRoutes;
