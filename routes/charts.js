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
    startElementsUsageChart_v1,
} = require("../controllers/elementsUsageChart_v1/startElementsUsageChart");

const {
    startElementsUsageChart_v2,
} = require("../controllers/elementsUsageChart_v2/startElementsUsageChart");

const {
    startAgenciesPostsPerIndustryChart,
} = require("../controllers/agenciesPostsPerIndustryChart/startAgenciesPostsPerIndustryChart");

const {
    startPostsPerDesignApprouchChart,
} = require("../controllers/postsPerLogoDesignChart/startPostsPerLogoDesignChart");

router.route("/colorusage").get(startColorUsageChart);
router.route("/postsperindustry").get(startPostsPerIndustryChart);
router.route("/logochangefrequency").get(startLogoChangeFrequencyChart);
router.route("/Elementsusagev1").get(startElementsUsageChart_v1);
router.route("/elementsusage").get(startElementsUsageChart_v2);
router
    .route("/agenciespostsperindustry")
    .get(startAgenciesPostsPerIndustryChart);
router.route("/postsperlogoDesign").get(startPostsPerDesignApprouchChart);
module.exports = router;
