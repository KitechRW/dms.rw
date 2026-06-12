const successResponse = (message, code, data = null) => ({
  success: true,
  message,
  code,
  errors: null,
  data,
});

const errorResponse = (message, code, errors = null) => ({
  success: false,
  message,
  code,
  errors,
  data: null,
});

module.exports = {
  successResponse,
  errorResponse,
};