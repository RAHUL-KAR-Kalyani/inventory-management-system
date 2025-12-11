const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController.js");
//const isAuth = require("../middleware/isAuth.js");


const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", getDashboardData);

module.exports = dashboardRouter;
