const express = require("express");
const router = express.Router();

const {
    startDisplayGraph,
} = require("../controllers/colorUsageChart/gettingGraphData");
const {
    startPostsPerIndustryChart,
} = require("../controllers/postsPerIndustryChart/startGettingPostsPerIndustryChartData");

router.route("/colorusage").get(startDisplayGraph);
router.route("/postsperindustry").get(startPostsPerIndustryChart);

module.exports = router;
