const { getColorUsageGraphData } = require("./gettingColorUsageGraphData");

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

const startCounting = async (req, res, industryFilter) => {
    let { postsColorsAndIndustryNames, colorsNamesAndHexValues } =
        await getColorUsageGraphData();
    ResetCountedColors();
    if (industryFilter !== "All industries") {
        postsColorsAndIndustryNames = filterThenCountPosts(
            postsColorsAndIndustryNames,
            industryFilter
        );
    }

    countingPosts(postsColorsAndIndustryNames);
    return { countedColors, colorsNamesAndHexValues };
};

// goes through all the Posts and only returns the Posts that meet the filter condition
const filterThenCountPosts = (postsColorsAndIndustryNames, filter) => {
    let filteredPosts = postsColorsAndIndustryNames.filter((post) => {
        // Todo: make it one line filter funtion
        if (post.industry[0] === filter) {
            return post;
        }
    });
    return filteredPosts;
};

// loops dynamicly over every Post sent to it to start counting colors and saving it in countedColors object
const countingPosts = (postsColorsAndIndustryNames) => {
    postsColorsAndIndustryNames.forEach((post) => {
        post.colors.forEach((color) => {
            countedColors[color]
                ? countedColors[color]++
                : (countedColors[color] = 1);
        });
    });
};

const ResetCountedColors = () => {
    colors = Object.keys(countedColors);
    colors.forEach((color) => {
        countedColors[color] = 0;
    });
};

module.exports = { startCounting };
