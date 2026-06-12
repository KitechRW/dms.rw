const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "password too short"),
  role: z.enum(["admin", "operator", "farmer"]),
});

module.exports = { createUserSchema };