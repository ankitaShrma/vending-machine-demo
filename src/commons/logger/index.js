const bunyan = require("bunyan");
const { name, version } = require("../../../package.json");

let streams = [];
streams.push(
  {
    level: "debug",
    stream: process.stdout,
  },
  {
    level: "info",
    path: process.env.LOGFILE,
  },
  {
    level: "error",
    path: process.env.LOGFILE,
  }
); //log to stdout

module.exports = bunyan.createLogger({ name, version, streams: streams });
