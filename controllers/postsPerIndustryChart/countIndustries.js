const {
    getAndPreparePostsPerIndustryChartData,
} = require("./getAndPreparepostsPerIndustryChartData");

let countedIndustries = {};

const startCount = async () => {
    const allPostsIndustriesNames =
        await getAndPreparePostsPerIndustryChartData();
    if (countedIndustries) {
        countedIndustries = {};
    }
    countIndustries(allPostsIndustriesNames);
    return countedIndustries;
};

const countIndustries = (allPostsIndustriesNames) => {
    allPostsIndustriesNames.forEach((postindustriesNames) => {
        postindustriesNames.forEach((postIndustryName) => {
            countedIndustries[postIndustryName]
                ? countedIndustries[postIndustryName]++
                : (countedIndustries[postIndustryName] = 1);
        });
    });
};

module.exports = { startCount };
