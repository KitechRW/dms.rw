const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
} = require("../controllers/userController");

const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin"), createUser);
router.get("/", authenticate, authorizeRoles("admin"), getUsers);
router.get("/:id", authenticate, authorizeRoles("admin"), getUserById);

module.exports = router;