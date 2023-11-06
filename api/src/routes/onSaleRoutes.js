const { Router } = require("express");

const { getHandlerOnSale } = require("../handlers/getHandlerOnSale");

const onSaleRoutes = Router();

onSaleRoutes.get("/", getHandlerOnSale);

module.exports = onSaleRoutes;
