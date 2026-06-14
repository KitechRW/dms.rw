const express = require("express");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  getFarmerDashboardSummary,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/farmer-summary",
  authenticate,
  authorizeRoles("farmer"),
  getFarmerDashboardSummary
);

module.exports = router;