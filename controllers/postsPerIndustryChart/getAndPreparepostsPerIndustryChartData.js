const {
    getPostsCollectionData,
    getAllPostsIndustriesNames,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getIndustriesCollectionData,
    getMainMenuIndusries,
} = require("../collectionsUtils/industriesCollectionUtils");

const getAndPreparePostsPerIndustryChartData = async () => {
    let postsCollectionData = await getPostsCollectionData();
    let industriesCollectionData = await getIndustriesCollectionData();
    industriesCollectionData = await getMainMenuIndusries(
        industriesCollectionData
    );
    let allPostsIndustriesNames = getAllPostsIndustriesNames(
        postsCollectionData,
        industriesCollectionData
    );

    return allPostsIndustriesNames;
};

module.exports = { getAndPreparePostsPerIndustryChartData };
