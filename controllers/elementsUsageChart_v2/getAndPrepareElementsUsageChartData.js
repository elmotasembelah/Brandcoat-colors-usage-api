const {
    getElementsCollectionData,
} = require("../collectionsUtils/elementsCollectionUtils.js");

const {
    getPostsCollectionData,
    filterPostsWithNoColors,
    filterPostsBasedOnIndustry,
    getElementsIdsOfColorsInPosts,
} = require("../collectionsUtils/postsCollectionUtils.js");

const {
    getColorsCollectionData,
    getMainColorsData,
} = require("../collectionsUtils/colorsCollectionUtils.js");

const {
    getIndustriesCollectionData,
} = require("../collectionsUtils/industriesCollectionUtils.js");

const getAndPrepareElementsUsageChartData = async (industryFilter) => {
    // ! this function dooesn't use the elementsCollectionData because it is static while counting, update to make it dynamic
    const elementsCollectionData = await getElementsCollectionData();

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
    const mainColorsData = getMainColorsData(colorsCollectionData);

    const elementsIdsOfColorsInPosts = getElementsIdsOfColorsInPosts(
        postsWithColors,
        mainColorsData
    );

    return elementsIdsOfColorsInPosts;
};

module.exports = { getAndPrepareElementsUsageChartData };
