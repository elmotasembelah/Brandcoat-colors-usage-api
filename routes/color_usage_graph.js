const express = require("express");
const router = express.Router();

const { startDisplayGraph } = require("../controllers/gettingGraphData");

router.route("/").get(startDisplayGraph);

module.exports = router;
