const { StatusCodes } = require("http-status-codes");
const {
    startCalculatingLogoChangeFrequency,
} = require("./calculateLogoChangeFrequency");

const startLogoChangeFrequencyChart = async (req, res) => {
    const { industryfilter } = req.headers;

    const countedYears = await startCalculatingLogoChangeFrequency(
        industryfilter
    );

    const countedYearsKeys = Object.keys(countedYears);
    const countedYearsValues = Object.values(countedYears);
    const chartColor = "#12121f";

    res.status(StatusCodes.OK).json({
        countedYearsKeys,
        countedYearsValues,
        chartColor,
    });
};

module.exports = { startLogoChangeFrequencyChart };
