const {
    getPostsCollectionData,
    filterPostsWithNoAgencies,
    getAllPostsIndustriesNames,
    filterPostsBasedOnAgency,
    getEachPostCreators,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getIndustriesCollectionData,
    getMainMenuIndusries,
} = require("../collectionsUtils/industriesCollectionUtils");

const {
    getCreatorsCollectionData,
} = require("../collectionsUtils/creatorsCollectionUtils");

const getAndPrepareAgenciesPostsPerIndustry = async (agencyFilter) => {
    let postsCollectionData = await getPostsCollectionData();
    postsCollectionData = filterPostsWithNoAgencies(postsCollectionData);
    const creatorsCollectionData = await getCreatorsCollectionData();

    if (agencyFilter !== "All agencies") {
        if (agencyFilter === "M N Associates") {
            agencyFilter = "M — N Associates";
        }
        postsCollectionData = filterPostsBasedOnAgency(
            postsCollectionData,
            creatorsCollectionData,
            agencyFilter
        );
    }

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

module.exports = { getAndPrepareAgenciesPostsPerIndustry };
