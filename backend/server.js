require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const seedUsersOnFirstRun = require("./src/seed/seedUsers");

const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const userRoutes = require("./src/routes/userRoutes");
const milkCollectionRoutes = require("./src/routes/milkCollectionRoutes");
const cooperativeRoutes = require("./src/routes/cooperativeRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/users", userRoutes);
app.use("/api/milk-collections", milkCollectionRoutes);
app.use("/api/cooperatives", cooperativeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const startServer = async () => {
  await connectDB();
  await seedUsersOnFirstRun();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});