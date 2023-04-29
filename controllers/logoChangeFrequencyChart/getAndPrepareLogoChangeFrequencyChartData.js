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

    console.log(postsCollectionData.length);

    let industriesCollectionData = await getIndustriesCollectionData();

    if (industryFilter !== "All industries") {
        postsCollectionData = filterPostsBasedOnIndustry(
            postsCollectionData,
            industriesCollectionData,
            industryFilter
        );
    }

    console.log(postsCollectionData.length);

    const postsOldDesignDateAndNewDesignData =
        getPostsOldDesignDateAndNewDesignDate(postsCollectionData, {
            lastPartInDateFormat: "month",
        });

    console.log(postsOldDesignDateAndNewDesignData.length);
    return postsOldDesignDateAndNewDesignData;
};

module.exports = {
    getAndPrePareLogoChangeFrequencyChartData,
};
