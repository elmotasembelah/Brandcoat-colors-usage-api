const {
    getPostsCollectionData,
    getPostsOldDesignDateAndNewDesignDate,
    filterPostsBasedOnIndustry,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getIndustriesCollectionData,
} = require("../collectionsUtils/industriesCollectionUtils");

const getAndPrePareLogoChangeFrequencyChartData = async (industryFilter) => {
    let postsCollectionData = await getPostsCollectionData();

    let industriesCollectionData = await getIndustriesCollectionData();

    if (industryFilter !== "All industries") {
        postsCollectionData = filterPostsBasedOnIndustry(
            postsCollectionData,
            industriesCollectionData,
            industryFilter
        );
    }

    const postsOldDesignDateAndNewDesignData =
        getPostsOldDesignDateAndNewDesignDate(postsCollectionData, {
            lastPartInDateFormat: "month",
        });

    return postsOldDesignDateAndNewDesignData;
};

module.exports = {
    getAndPrePareLogoChangeFrequencyChartData,
};
