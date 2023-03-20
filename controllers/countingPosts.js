const { getColorUsageGraphData } = require("./gettingColorUsageGraphData");
const { StatusCodes } = require("http-status-codes");

let countedColors = {};
let resetCount = 0;

const startCounting = async (req, res) => {
    let { postsColorsAndIndustryNames, colorsNamesAndHexValues } =
        await getColorUsageGraphData(req.body);
    console.log("finished with api");
    const { industryFilter } = req.body;
    resetCount && countedColorsReset();
    resetCount = 1;
    if (industryFilter !== "all industries") {
        postsColorsAndIndustryNames = filterThenCountPosts(
            postsColorsAndIndustryNames,
            industryFilter
        );
    }
    countingPosts(postsColorsAndIndustryNames);
    console.log(countedColors);
    res.status(StatusCodes.OK).json({
        countedColors,
    });
};

// goes through all the Posts and only returns the Posts that meet the filter condition
const filterThenCountPosts = (postsColorsAndIndustryNames, filter) => {
    console.log("entered filtering funciton");
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

const countedColorsReset = () => {
    for (const [key, yearGroupObject] of Object.entries(countedColors)) {
        for (let [key, value] of Object.entries(yearGroupObject)) {
            if (!isNaN(value)) {
                yearGroupObject[key] = 0;
            }
        }
    }
};

module.exports = { startCounting };
