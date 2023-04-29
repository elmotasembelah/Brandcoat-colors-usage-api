const {
    getColorUsageGraphData,
} = require("./getAndPrepareColorUsageChartData");

const startCounting = async (industryFilter) => {
    let { postsColorsAndIndustryNames, colorsNamesAndHexValues } =
        await getColorUsageGraphData(industryFilter);

    const countedColors = countingPosts(postsColorsAndIndustryNames);
    return { countedColors, colorsNamesAndHexValues };
};

const countingPosts = (postsColorsAndIndustryNames) => {
    let countedColors = {
        Red: 0,
        Orange: 0,
        Yellow: 0,
        Lime: 0,
        Green: 0,
        Olive: 0,
        Seafoam: 0,
        Teal: 0,
        "Sky Blue": 0,
        Blue: 0,
        Violet: 0,
        Purple: 0,
        Pink: 0,
        Coral: 0,
        Brown: 0,
        Black: 0,
        Grayscale: 0,
    };

    postsColorsAndIndustryNames.forEach((post) => {
        post.colors.forEach((color) => {
            countedColors[color]
                ? countedColors[color]++
                : (countedColors[color] = 1);
        });
    });

    return countedColors;
};

module.exports = { startCounting };
