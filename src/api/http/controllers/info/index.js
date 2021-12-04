const { name, version } = require("../../../../../package.json");

const getAppInfo = (req, res) => {
  res.json({ name, version });
};

const infoHandler = {
  getAppInfo,
};

module.exports = infoHandler;
