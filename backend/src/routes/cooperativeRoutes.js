const express = require("express");
const router = express.Router();

const { createCooperative } = require("../controllers/cooperativeController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, createCooperative);

module.exports = router;