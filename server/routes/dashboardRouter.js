const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController.js");
const isAuth = require("../middleware/isAuth.js");


const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", isAuth, getDashboardData);

module.exports = dashboardRouter;
