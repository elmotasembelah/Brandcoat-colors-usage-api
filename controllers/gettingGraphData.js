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
    // displayChart(datasets, industryName);
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

let stackedBarChart;

const displayChart = (datasets, industryName) => {
    // Bar chart
    stackedBarChart = new Chart(document.getElementById("bar-chart"), {
        type: "bar",
        data: {
            labels: ["Red", "Blue", "Green", "Brown", "Purple"],
            datasets: datasets,
        },
        options: {
            plugins: {
                legend: { display: true },
                title: {
                    display: true,
                    text: `The usage of colors in ${industryName.toLowerCase()} over the years`,
                },
            },
            resposive: true,
        },
    });
};

const destroyChart = () => {
    stackedBarChart.destroy();
};

module.exports = { startDisplayGraph, destroyChart };
