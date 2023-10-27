const { Router } = require("express");

const { postHandlerCategory } = require("../handlers/postHandlerCategory");
const { getHandlerCategories } = require("../handlers/getHandlerCategories");

const catagoryRoutes = Router();

catagoryRoutes.get("/", getHandlerCategories);
catagoryRoutes.post("/create", postHandlerCategory);

module.exports = catagoryRoutes;
