const bcrypt = require("bcrypt");
const User = require("../models/User");

const DEFAULT_PASSWORD = process.env.SEED_DEFAULT_PASSWORD || "ChangeMe123!";

const DEFAULT_USERS = [
  {
    name: "Farmer User",
    email: "farmer@example.com",
    role: "farmer",
  },
  {
    name: "Operator User",
    email: "operator@example.com",
    role: "operator",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
];

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
};

const seedUsersOnFirstRun = async () => {
  const usersCount = await User.countDocuments();

  if (usersCount > 0) {
    console.log("Users already exist. Seed skipped.");
    return;
  }

  const usersToInsert = await Promise.all(
    DEFAULT_USERS.map(async (user) => ({
      ...user,
      password: await hashPassword(DEFAULT_PASSWORD),
    }))
  );

  await User.insertMany(usersToInsert);
  console.log("Default users seeded successfully.");
};

module.exports = seedUsersOnFirstRun;
