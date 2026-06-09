const express = require("express");
const router = express.Router();

const { getPendingActions } = require("../controllers/pendingActionsController");

router.get("/pending-actions", getPendingActions);

module.exports = router;