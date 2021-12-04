/**
 * Index Router File
 * Lists all the routes of the API
 * Hanldes 404 routes
 */

const express = require("express");
const router = express.Router();

// import all the routes
const infoRouter = require("./infoRouter");
const machineRouter = require("./machineRouter");
const unknownMethod = require("../controllers/unknownMethod");

// Register the routes
router.use("/info", infoRouter);

// Fill in other routes
router.use("/machine", machineRouter);

// If nothing processed from above, the 404 response will be generated
router.all("*", unknownMethod.notFound);

module.exports = router;
