const express = require("express");
const router = express.Router();

const {
    startColorUsageChart,
} = require("../controllers/colorUsageChart/startColorUsageChart");

const {
    startPostsPerIndustryChart,
} = require("../controllers/postsPerIndustryChart/startPostsPerIndustryChart");

const {
    startLogoChangeFrequencyChart,
} = require("../controllers/logoChangeFrequencyChart/startLogoChangeFrequencyChart");

const {
    startElementsUsageChart,
} = require("../controllers/ElementalUsageChart/startElementsUsageChart");

router.route("/colorusage").get(startColorUsageChart);
router.route("/postsperindustry").get(startPostsPerIndustryChart);
router.route("/logochangefrequency").get(startLogoChangeFrequencyChart);
router.route("/elementsusage").get(startElementsUsageChart);

module.exports = router;
