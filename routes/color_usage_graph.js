const express = require("express");
const router = express.Router();

const { startCounting } = require("../controllers/countingPosts");

router.route("/").get(startCounting);

module.exports = router;
