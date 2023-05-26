const {
    getAndPrepareAgenciesPostsPerIndustry,
} = require("./getAndPrepareAgenciesPostsPerIndustryChartData");

let countedIndustries = {};

const startCount = async (agencyFilter) => {
    const allPostsIndustriesNames = await getAndPrepareAgenciesPostsPerIndustry(
        agencyFilter
    );
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
