const { Router } = require("express");
const { postHandlerUser } = require("../handlers/postHandlerUser");
const { getHandlerUser } = require("../handlers/getHandlerUser");
const { putHandlerUser } = require("../handlers/putHandlerUser");

const userRoutes = Router();
userRoutes.post("/create", postHandlerUser);
userRoutes.get("/user", getHandlerUser);
userRoutes.put("/user/edit", putHandlerUser);

module.exports = userRoutes;
