const infoController = require("../../controllers/info");

const express = require("express");
const infoRouter = express.Router();

// Register handlers here
infoRouter.route("/").get(infoController.getAppInfo);

module.exports = infoRouter;
