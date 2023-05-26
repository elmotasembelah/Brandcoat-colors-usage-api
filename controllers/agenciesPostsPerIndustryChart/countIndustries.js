const {
    getAndPrepareAgenciesPostsPerIndustry,
} = require("./getAndPrepareAgenciesPostsPerIndustryChartData");

const startCount = async (agencyFilter) => {
    let countedIndustries = {
        Agricultural: 0,
        Aviation: 0,
        "Cafes & Bistros": 0,
        Corporations: 0,
        Creative: 0,
        Education: 0,
        Entertainment: 0,
        FMCG: 0,
        Fashion: 0,
        "Financial Services": 0,
        Healthcare: 0,
        Hospitality: 0,
        Industrial: 0,
        "Real Estate": 0,
        Restaurants: 0,
        Retail: 0,
        "Tea & Refreshments": 0,
        Technolgy: 0,
        "Transport & Logistics": 0,
    };

    const countedIndustriesKeys = Object.keys(countedIndustries);
    const allPostsIndustriesNames = await getAndPrepareAgenciesPostsPerIndustry(
        agencyFilter
    );

    countIndustries(
        allPostsIndustriesNames,
        countedIndustries,
        countedIndustriesKeys
    );
    return countedIndustries;
};

const countIndustries = (
    allPostsIndustriesNames,
    countedIndustries,
    countedIndustriesKeys
) => {
    allPostsIndustriesNames.forEach((postindustriesNames) => {
        postindustriesNames.forEach((postIndustryName) => {
            if (countedIndustriesKeys.includes(postIndustryName)) {
                countedIndustries[postIndustryName]++;
            }
        });
    });
};

module.exports = { startCount };
