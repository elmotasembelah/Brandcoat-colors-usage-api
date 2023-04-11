const { startCounting } = require("./countingPosts");
const { StatusCodes } = require("http-status-codes");

const startDisplayGraph = async (req, res) => {
    const { industryfilter } = req.headers;

    const { countedColors, colorsNamesAndHexValues } = await startCounting(
        req,
        res,
        industryfilter
    );

    const histogramColors = prepareHistogramColors(
        countedColors,
        colorsNamesAndHexValues
    );
    const countedColorsValues = Object.values(countedColors);
    const countedColorsNames = Object.keys(countedColors);

    res.status(StatusCodes.OK).json({
        countedColorsNames,
        countedColorsValues,
        histogramColors,
    });
};

const prepareHistogramColors = (countedColors, colorsNamesAndHexValues) => {
    let histogramColors = [];
    const countedColorsNames = Object.keys(countedColors);
    countedColorsNames.forEach((colorName) => {
        colorsNamesAndHexValues.forEach((color) => {
            if (color.name === colorName) histogramColors.push(color.hexValue);
        });
    });
    return histogramColors;
};

module.exports = { startDisplayGraph };
