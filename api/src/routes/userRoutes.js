const { Router } = require("express");
const { postHandlerUser } = require("../handlers/postHandlerUser");
const { getHandlerUser } = require("../handlers/getHandlerUser");
const { putHandlerUser } = require("../handlers/putHandlerUser");
const { getHandlerAllUser } = require("../handlers/getHandlerAllUsers");

const userRoutes = Router();
userRoutes.post("/create", postHandlerUser);
userRoutes.get("/user", getHandlerUser);
userRoutes.put("/user/edit", putHandlerUser);
userRoutes.get("/all", getHandlerAllUser);
module.exports = userRoutes;
