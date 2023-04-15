const {
    getPostsCollectionData,
    getAllPostsIndustriesNames,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getIndustriesCollectionData,
} = require("../collectionsUtils/industriesCollectionUtils");

const getAndPreparePostsPerIndustryChartData = async () => {
    let postsCollectionData = await getPostsCollectionData();
    let industriesCollectionData = await getIndustriesCollectionData();

    let allPostsIndustriesNames = getAllPostsIndustriesNames(
        postsCollectionData,
        industriesCollectionData
    );

    return allPostsIndustriesNames;
};

module.exports = { getAndPreparePostsPerIndustryChartData };
