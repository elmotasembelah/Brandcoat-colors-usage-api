const {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getPostsColors,
    filterPostsBasedOnIndustry,
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

const getColorUsageGraphData = async (industryFilter) => {
    let postsCollectionData = await getPostsCollectionData();
    postsCollectionData = filterPostsWithNoColors(postsCollectionData);

    let colorsCollectionData = await getColorsCollectionData();
    colorsCollectionData = getMainColorsData(colorsCollectionData);
    colorsCollectionData = removeColorByNameFromColorsCollectionData(
        colorsCollectionData,
        "White"
    );

    let industriesCollectionData = await getIndustriesCollectionData();

    if (industryFilter !== "All industries") {
        postsCollectionData = filterPostsBasedOnIndustry(
            postsCollectionData,
            industriesCollectionData,
            industryFilter
        );
    }

    let postsColorsAndIndustryNames = getPostsColors(
        postsCollectionData,
        colorsCollectionData
    );

    const colorsNamesAndHexValues =
        filterColorsNamesAndHexvalues(colorsCollectionData);

    return {
        postsColorsAndIndustryNames,
        colorsNamesAndHexValues,
    };
};

module.exports = { getColorUsageGraphData };
