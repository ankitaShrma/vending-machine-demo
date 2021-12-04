const log = require("../../../../commons/logger");
const { errorResponse } = require("../../../../commons/response");
// Update with Boom/joi later
/* eslint-disable-next-line */
const errorHandler = (err, req, res, next) => {
  log.error(`Error on ${req.method} ${req.url}`, {
    body: req.body,
    params: req.params,
    query: req.query,
  });
  log.debug(err.stack);

  errorResponse(res, err.message, err.statusCode || 500, {
    errorType: err.errorType,
    step: err.step,
    product: err.product,
  });
};

module.exports = errorHandler;
