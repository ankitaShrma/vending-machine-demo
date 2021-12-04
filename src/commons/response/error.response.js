/**
 *
 * @param {object} res response object
 * @param {string} message error message
 * @param {object} options other options
 */

const error = (res, message = "", statusCode = 400, options = {}) => {
  res.status(statusCode).json({ error: message, ...options });
};

module.exports = error;
