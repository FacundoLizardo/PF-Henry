const { Router } = require("express");

const { getHandlerRating } = require("../handlers/getHandlerRating");
const { postHandlerRating } = require("../handlers/postHandlerRating");

const ratingRoutes = Router();

ratingRoutes.get("/rating", getHandlerRating);
ratingRoutes.post("/rating", postHandlerRating);

module.exports = ratingRoutes;
