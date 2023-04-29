const { startCount } = require("./countIndustries");
const { StatusCodes } = require("http-status-codes");

const startPostsPerIndustryChart = async (req, res) => {
    countedIndustries = await startCount();

    const industriesNames = Object.keys(countedIndustries);
    const amountOfCountedPosts = Object.values(countedIndustries);
    const chartColors = "#12121f";

    res.status(StatusCodes.OK).json({
        industriesNames,
        amountOfCountedPosts,
        chartColors,
    });
};

module.exports = { startPostsPerIndustryChart };
