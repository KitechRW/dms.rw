const bcrypt = require("bcrypt");
const User = require("../models/User");
const Cooperative = require("../models/Cooperative");
const MilkCollection = require("../models/MilkCollection");

const DEFAULT_PASSWORD = process.env.SEED_DEFAULT_PASSWORD || "ChangeMe123!";

const DEFAULT_USERS = [
  { name: "Farmer User", email: "farmer@example.com", role: "farmer" },
  { name: "Operator User", email: "operator@example.com", role: "operator" },
  { name: "Admin User", email: "admin@example.com", role: "admin" },
];

const hashPassword = async (plainPassword) =>
  bcrypt.hash(plainPassword, 10);

const seedUsersOnFirstRun = async () => {
  try {
    console.log(" Seed started...");

   const exists = await User.countDocuments();
if (exists > 0) {
  console.log("Seed skipped - data already exists");
  return;
}
    await Cooperative.deleteMany();
    await MilkCollection.deleteMany();

    const usersToInsert = await Promise.all(
      DEFAULT_USERS.map(async (user) => ({
        ...user,
        password: await hashPassword(DEFAULT_PASSWORD),
      }))
    );

    const createdUsers = await User.insertMany(usersToInsert);

    const admin = createdUsers.find(u => u.role === "admin");
    const operator = createdUsers.find(u => u.role === "operator");
    const farmer = createdUsers.find(u => u.role === "farmer");

    const createdCoops = await Cooperative.insertMany([
      {
        name: "Kigali Dairy Cooperative",
        location: "Kigali",
        members: [],
        owner: admin._id,
        status: "inactive"
      },
      {
        name: "Eastern Milk Cooperative",
        location: "Kayonza",
        members: [farmer._id],
        owner: admin._id,
        status: "active"
      }
    ]);
     const kigaliCoop = createdCoops[0];
    const easternCoop = createdCoops[1];

    await MilkCollection.insertMany([
      {
        farmer: farmer._id,
        cooperative: kigaliCoop._id,
        volume: 10,
        status: "pending",
        paymentStatus: "unpaid",
        operator: operator._id
      },
      {
        farmer: farmer._id,
        cooperative: easternCoop._id,
        volume: 20,
        status: "approved",
        paymentStatus: "paid",
        operator: operator._id
      }
    ]);

    console.log(" Seed completed successfully");
  } catch (err) {
    console.error(" Seed error:", err);
  }
};

module.exports = seedUsersOnFirstRun;