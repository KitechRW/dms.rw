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

const validate = require("../middleware/validate");

const {
  milkCollectionQuerySchema,

} = require("../validations/userValidations");
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
  authorizeRoles("operator"),
  getRecentMilkCollections
);

router.get(
  "/",
  authenticate,
  authorizeRoles("operator", "admin"),
  validate(milkCollectionQuerySchema, "query"),
  getMilkCollections
);

module.exports = router;
