const express = require("express");
const router = express.Router();

const { createCooperative, getCooperatives } = require("../controllers/cooperativeController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, createCooperative);
router.get("/", authenticate, getCooperatives);

module.exports = router;