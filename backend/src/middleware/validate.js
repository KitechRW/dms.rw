const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues[0]?.message;

      return res.status(400).json({
        message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = validate;