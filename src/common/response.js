const CreateError = require("http-errors");

module.exports.Response = {
  success: (res, status = 200, message = "OK", body = {}) => {
    res.status(status).json({ message, body });
  },
  error: (res, error = null) => {
    const { statusCode, message } = error
      ? error
      : new CreateError.InternalServerError();
    res.status(statusCode).json({ message });
  },
};
