const {
    getPostsCollectionData,
    filterPostsWithNoColors,
    filterPostsBasedOnIndustry,
    getElementsIdsOfColorsInPostsOld,
    getElementsIdsOfColorsInPosts,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getColorsCollectionData,
    getMainColorsData,
} = require("../collectionsUtils/colorsCollectionUtils.js");

const {
    getIndustriesCollectionData,
} = require("../collectionsUtils/industriesCollectionUtils");

const getAndPrepareElementalUsageChartData = async (industryFilter) => {
    let postsCollectionData = await getPostsCollectionData();

    const industriesCollectionData = await getIndustriesCollectionData();

    if (industryFilter !== "All industries") {
        postsCollectionData = filterPostsBasedOnIndustry(
            postsCollectionData,
            industriesCollectionData,
            industryFilter
        );
    }

    const postsWithColors = filterPostsWithNoColors(postsCollectionData);

    const colorsCollectionData = await getColorsCollectionData();
    const mainColorsData = await getMainColorsData(colorsCollectionData);

    const elementsIdsOfColorsInPosts = getElementsIdsOfColorsInPostsOld(
        postsWithColors,
        mainColorsData
    );

    return elementsIdsOfColorsInPosts;
};

module.exports = {
    getAndPrepareElementalUsageChartData,
};
