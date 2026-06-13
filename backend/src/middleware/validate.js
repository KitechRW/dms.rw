const { ZodError } = require("zod");
const { errorResponse } = require("../utils/apiResponse");

const validate = (schema, source = "body") => (req, res, next) => {
  try {
    schema.parse(req[source]);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(errorResponse(error.issues[0].message, "VALIDATION_ERROR"));
    }

    return res.status(500).json(
      errorResponse("Internal server error", "INTERNAL_SERVER_ERROR")
    );
  }
};

module.exports = validate;