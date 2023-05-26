const {
    getPostsCollectionData,
    filterPostsBasedOnIndustry,
    filterPostsWithNoDesignApprouches,
    getAllPostsDesignApprouchessNames,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getDesignApprouchesCollectionData,
} = require("../collectionsUtils/designApprouchesCollectionUtils");

const {
    getIndustriesCollectionData,
} = require("../collectionsUtils/industriesCollectionUtils");

const getAndPrepareNoAgenciesChartData = async (industryFilter) => {
    let postsCollectionData = await getPostsCollectionData();

    let industriesCollectionData = await getIndustriesCollectionData();

    if (industryFilter !== "All industries") {
        postsCollectionData = filterPostsBasedOnIndustry(
            postsCollectionData,
            industriesCollectionData,
            industryFilter
        );
    }

    postsCollectionData =
        filterPostsWithNoDesignApprouches(postsCollectionData);

    const designApprouchesCollectionData =
        await getDesignApprouchesCollectionData();

    const postsDesignApprouchesNames = getAllPostsDesignApprouchessNames(
        postsCollectionData,
        designApprouchesCollectionData
    );

    return postsDesignApprouchesNames;
};

module.exports = { getAndPrepareNoAgenciesChartData };
