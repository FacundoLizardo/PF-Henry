const { Router } = require("express");
const { postHandlerUser } = require("../handlers/postHandlerUser");

const userRoutes = Router();
userRoutes.post("/create", postHandlerUser);

module.exports = userRoutes;
