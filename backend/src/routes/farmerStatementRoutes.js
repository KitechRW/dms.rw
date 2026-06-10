const express = require("express");
const router = express.Router();

const { generateFarmerStatement } = require("../controllers/farmerStatementController");

router.get("/farmers/:id/statement", generateFarmerStatement);

module.exports = router;