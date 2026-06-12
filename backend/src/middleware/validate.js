const { ZodError } = require("zod");
const { errorResponse } = require("../utils/apiResponse");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
  return res.status(400).json(
    errorResponse(
      error.issues[0].message,
      "VALIDATION_ERROR",
    )
  );
}

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = validate;