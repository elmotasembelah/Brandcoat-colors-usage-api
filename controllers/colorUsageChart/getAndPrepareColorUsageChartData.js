const {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getPostsColorsAndIndustryNames,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getColorsCollectionData,
    getMainColorsData,
    removeColorByNameFromColorsCollectionData,
    filterColorsNamesAndHexvalues,
} = require("../collectionsUtils/colorsCollectionUtils.js");

const {
    getIndustriesCollectionData,
} = require("../collectionsUtils/industriesCollectionUtils");

const getColorUsageGraphData = async () => {
    let postsCollectionData = await getPostsCollectionData();
    postsCollectionData = filterPostsWithNoColors(postsCollectionData);

    let colorsCollectionData = await getColorsCollectionData();
    colorsCollectionData = getMainColorsData(colorsCollectionData);
    colorsCollectionData = removeColorByNameFromColorsCollectionData(
        colorsCollectionData,
        "White"
    );

    let industriesCollectionData = await getIndustriesCollectionData();

    const postsColorsAndIndustryNames = getPostsColorsAndIndustryNames(
        postsCollectionData,
        colorsCollectionData,
        industriesCollectionData
    );
    const colorsNamesAndHexValues =
        filterColorsNamesAndHexvalues(colorsCollectionData);

    return {
        postsColorsAndIndustryNames,
        colorsNamesAndHexValues,
    };
};

module.exports = { getColorUsageGraphData };
