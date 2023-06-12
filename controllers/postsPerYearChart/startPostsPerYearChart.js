const { startCount } = require("./countPostsPerYear");
const { StatusCodes } = require("http-status-codes");

const startPostsPerYearChart = async (req, res) => {
    const countedPostsPerYear = await startCount();

    const years = Object.keys(countedPostsPerYear);
    const countedPosts = Object.values(countedPostsPerYear);
    const chartColors = "#12121f";

    res.status(StatusCodes.OK).json({
        years,
        countedPosts,
        chartColors,
    });
};

module.exports = { startPostsPerYearChart };
