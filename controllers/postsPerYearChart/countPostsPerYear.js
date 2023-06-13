const {
    getAndPreparePostsPerYearChartData,
} = require("./getAndPreparePostsPerYearChartData");

const startCount = async () => {
    const postsLatestBrandingYear = await getAndPreparePostsPerYearChartData();

    let countedPostsPerYear = countPostsPerYears(postsLatestBrandingYear);

    return countedPostsPerYear;
};

const countPostsPerYears = (postsLatestBrandingYear) => {
    let countedPostsPerYear = {};

    postsLatestBrandingYear.forEach((postYear) => {
        countedPostsPerYear[postYear]
            ? countedPostsPerYear[postYear]++
            : (countedPostsPerYear[postYear] = 1);
    });

    return countedPostsPerYear;
};

module.exports = { startCount };
