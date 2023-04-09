const { getColorUsageGraphData } = require("./gettingColorUsageGraphData");

let countedColors = {};

const startCounting = async (req, res, industryFilter) => {
    let { postsColorsAndIndustryNames, colorsNamesAndHexValues } =
        await getColorUsageGraphData();
    countedColors = {};
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

// loops dynamicly over every Post sent to it to start cointing colors and saving it in countedColors object
const countingPosts = (postsColorsAndIndustryNames) => {
    postsColorsAndIndustryNames.forEach((post) => {
        post.colors.forEach((color) => {
            countedColors[color]
                ? countedColors[color]++
                : (countedColors[color] = 1);
        });
    });
};

module.exports = { startCounting };
