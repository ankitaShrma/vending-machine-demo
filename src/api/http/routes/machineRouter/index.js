const machineController = require("../../controllers/machine");

const express = require("express");
const machineRouter = express.Router();

// Register handlers here
machineRouter.route("/").post(machineController.initMachine);
/**
 * parameters:
 * - (body) state {String}
 * - (body) currency {Number}
 * - (body) product {Object}
 * - (body) change {Number}
 */
machineRouter.route("/:action").put(machineController.nextState);

module.exports = machineRouter;
