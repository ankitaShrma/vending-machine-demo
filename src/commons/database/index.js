const mongoose = require("mongoose");
const log = require("../logger");

const handleEvents = function (db) {
  let mongodb = {
    status: "1",
    updated: new Date(),
  };
  db.on("connecting", function () {
    log.info("Connecting to MongoDB...");
  });

  db.on("connected", function () {
    mongodb.updated = new Date();
    mongodb.status = "1";
    log.info("Connected to MongoDB!");
  });

  db.on("reconnected", function () {
    mongodb.updated = new Date();
    mongodb.status = "1";
    log.info("MongoDB reconnected!");
  });

  db.on("disconnected", function () {
    if (mongodb.status === "1") {
      mongodb.updated = new Date();
      log.error("MongoDB disconnected!");
    }
    mongodb.status = "0";
  });

  db.on("error", function (err) {
    console.log(process.env.MONGO_URL, err);
    if (mongodb.status === "1") {
      mongodb.updated = new Date();
    }
    mongodb.status = "0: " + err;
    log.info({ error: err.message }, "MongoDB connection error");
    process.exit(0);
  });
};

const createConnection = () => {
  mongoose.connect(process.env.MONGO_URL);
  let db = mongoose.connection;
  handleEvents(db);
};

module.exports = {
  createConnection,
};
