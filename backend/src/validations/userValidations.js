const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "password too short"),
  role: z.enum(["admin", "operator", "farmer"]),
});
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const milkCollectionQuerySchema = z.object({
  cooperative: z
    .string()
    .regex(objectIdRegex, "Invalid cooperative filter")
    .optional(),
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

module.exports = {
     createUserSchema,
    milkCollectionQuerySchema,
 };