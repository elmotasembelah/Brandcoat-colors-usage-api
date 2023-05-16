const {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getElementsIdsOfColorsInPosts,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getColorsCollectionData,
    getMainColorsData,
} = require("../collectionsUtils/colorsCollectionUtils.js");

const getAndPrepareElementalUsageChartData = async (req, res) => {
    const postsCollectionData = await getPostsCollectionData();
    const postsWithColors = filterPostsWithNoColors(postsCollectionData);

    const colorsCollectionData = await getColorsCollectionData();
    const mainColorsData = await getMainColorsData(colorsCollectionData);

    const elementsIdsOfColorsInPosts = getElementsIdsOfColorsInPosts(
        postsWithColors,
        mainColorsData
    );

    return elementsIdsOfColorsInPosts;
};

module.exports = {
    getAndPrepareElementalUsageChartData,
};
