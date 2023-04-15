const { startCount } = require("./countIndustries");
const { StatusCodes } = require("http-status-codes");

const startPostsPerIndustryChart = async (req, res) => {
    countedIndustries = await startCount();

    const industriesNames = Object.keys(countedIndustries);
    const amountOfCountedPosts = Object.values(countedIndustries);
    const chartColors = "#12121f";

    // [
    //     '#e91d14', '#f59128',
    //     '#fced0c', '#bfff00',
    //     '#00ac00', '#808026',
    //     '#5cc1a5', '#377e7f',
    //     '#00aff0', '#1034a6',
    //     '#7a44b7', '#75147c',
    //     '#f69acc', '#f36f63',
    //     '#964b00', '#010101',
    //     '#ababab'
    //   ]

    res.status(StatusCodes.OK).json({
        industriesNames,
        amountOfCountedPosts,
        chartColors,
    });
};

module.exports = { startPostsPerIndustryChart };
