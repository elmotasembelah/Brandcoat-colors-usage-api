const { startCount } = require("./countIndustries");
const { StatusCodes } = require("http-status-codes");

const startAgenciesPostsPerIndustryChart = async (req, res) => {
    const { agencyfilter } = req.headers;

    const countedIndustries = await startCount(agencyfilter);

    const industriesNames = Object.keys(countedIndustries);
    const amountOfCountedPosts = Object.values(countedIndustries);
    const chartColors = "#999EA1";

    res.status(StatusCodes.OK).json({
        industriesNames,
        amountOfCountedPosts,
        chartColors,
    });
};

module.exports = { startAgenciesPostsPerIndustryChart };
