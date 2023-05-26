const {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getPostsColors,
    filterPostsBasedOnIndustry,
    getEachPostIndustriesNames,
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

let INDUSTRYLISTFORFILTERMENU = "";

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
    } else if (INDUSTRYLISTFORFILTERMENU === "") {
        INDUSTRYLISTFORFILTERMENU = getUniqueIndustriesFromPosts(
            industriesCollectionData,
            postsCollectionData
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
        INDUSTRYLISTFORFILTERMENU,
    };
};

const getUniqueIndustriesFromPosts = (
    industriesCollectionData,
    postsCollectionData
) => {
    let uniqueIndustriesFromPosts = [];
    postsCollectionData.forEach((postData) => {
        const industriesNames = getEachPostIndustriesNames(
            postData,
            industriesCollectionData
        );
        if (
            !uniqueIndustriesFromPosts.includes(industriesNames[0]) &&
            industriesNames[0] !== "ABs & Nightlife"
        )
            uniqueIndustriesFromPosts.push(industriesNames[0]);
    });
    return uniqueIndustriesFromPosts.sort();
};

module.exports = { getColorUsageGraphData };
