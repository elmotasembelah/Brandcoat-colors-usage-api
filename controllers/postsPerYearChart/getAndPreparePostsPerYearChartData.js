const {
    getPostsCollectionData,
    getPostsLatestBrandingDate,
} = require("../collectionsUtils/postsCollectionUtils");

const getAndPreparePostsPerYearChartData = async () => {
    const postsCollectionData = await getPostsCollectionData();

    const postsLatestBrandingYear = getPostsLatestBrandingDate(
        postsCollectionData,
        { lastPartInDateFormat: "year" }
    );
    return postsLatestBrandingYear.sort();
};

module.exports = { getAndPreparePostsPerYearChartData };
