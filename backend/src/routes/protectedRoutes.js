const express = require("express");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    message: "Authenticated user",
    user: req.user,
  });
});

router.get("/admin", authenticate, authorizeRoles("admin"), (req, res) => {
  return res.status(200).json({ message: "Admin access granted" });
});

router.get(
  "/operator-or-admin",
  authenticate,
  authorizeRoles("operator", "admin"),
  (req, res) => {
    return res.status(200).json({ message: "Operator/Admin access granted" });
  }
);

router.get(
  "/farmer-only",
  authenticate,
  authorizeRoles("farmer"),
  (req, res) => {
    return res.status(200).json({ message: "Farmer access granted" });
  }
);

module.exports = router;
