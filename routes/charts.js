const express = require("express");
const router = express.Router();

const {
    startDisplayGraph,
} = require("../controllers/colorUsageChart/gettingGraphData");

const {
    startPostsPerIndustryChart,
} = require("../controllers/postsPerIndustryChart/startGettingPostsPerIndustryChartData");

const {
    startGettingLogoChangeFrequencyChartData,
} = require("../controllers/logoChangeFrequencyChart/startGettingLogoChangeFrequencyChartData");

router.route("/colorusage").get(startDisplayGraph);
router.route("/postsperindustry").get(startPostsPerIndustryChart);
router
    .route("/logochangefrequency")
    .get(startGettingLogoChangeFrequencyChartData);

module.exports = router;
