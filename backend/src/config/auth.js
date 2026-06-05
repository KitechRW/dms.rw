const FALLBACK_JWT_SECRET = "dev-jwt-secret-change-this";

const jwtSecret = process.env.JWT_SECRET || FALLBACK_JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";

if (!process.env.JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set. Using development fallback secret. Set JWT_SECRET in .env for production."
  );
}

module.exports = {
  jwtSecret,
  jwtExpiresIn,
};
