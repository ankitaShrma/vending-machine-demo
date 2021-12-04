// Main starting file
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const log = require("./commons/logger");
const router = require("./api/http/routes/router");
const { createConnection } = require("./commons/database");
const errorController = require("./api/http/controllers/error");
const { methodNotAllowed } = require("./api/http/controllers/unknownMethod");
//allow CORS on all requests

const corsOptions = {
  origin: true,
  methods: "GET,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Content-Disposition",
    "Date",
    "Origin",
  ],
  // will let browser cache preflights reponse (OPTIONS) for some time
  maxAge: 86400, //24h, as firefox max, but chromium max will be 2h
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// DB  conn
createConnection();
app.all("/*", router);

// Error handler. Keep below routes
app.use(errorController);

app.on("MethodNotAllowed", methodNotAllowed);
app.listen(process.env.APIPORT, () => {
  log.info(`Server started on ${process.env.APIPORT}`);
});
