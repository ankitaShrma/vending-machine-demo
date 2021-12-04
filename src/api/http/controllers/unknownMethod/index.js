const { errorResponse } = require("../../../../commons/response");
const config = require("../../../../config");

const methodNotAllowed = (req, res) => {
  const message = "methodNotAllowed";
  const error = config.error[message](req.method) || message;
  errorResponse(res, error, 405);
};

const notFound = (req, res) => {
  const message = "notFound";
  const error = config.error[message] || message;
  errorResponse(res, error, 404);
};

module.exports = { methodNotAllowed, notFound };
