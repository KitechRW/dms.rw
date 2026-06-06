const express = require("express");
const {
  createMilkCollection,
  getMilkCollections,
  getRecentMilkCollections,
} = require("../controllers/milkCollectionController");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("operator"),
  createMilkCollection
);

router.get(
  "/recent",
  authenticate,
  authorizeRoles("operator", "admin"),
  getRecentMilkCollections
);

router.get(
  "/",
  authenticate,
  authorizeRoles("operator", "admin"),
  getMilkCollections
);

module.exports = router;
