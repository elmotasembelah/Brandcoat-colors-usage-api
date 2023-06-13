const {
    getPostsCollectionData,
    filterPostsWithNoDesignApprouches,
    filterPostsBasedDesignApprouch,
    getPostsLatestBrandingDate,
} = require("../collectionsUtils/postsCollectionUtils");

const {
    getDesignApprouchesCollectionData,
} = require("../collectionsUtils/designApprouchesCollectionUtils");

const getAndPrepareDesignApprouchUsagePerYear = async (
    designApprouchFilter
) => {
    // ? to be romoved once we add a filter menu to allow for dynamic filtering
    designApprouchFilter = "Wordmark";

    const postsCollectionData = await getPostsCollectionData();
    const postsWithDesignApprouches =
        filterPostsWithNoDesignApprouches(postsCollectionData);

    const designApprouchesCollectionData =
        await getDesignApprouchesCollectionData();

    const filteredPostsBasedOnDesignApprouchFilter =
        filterPostsBasedDesignApprouch(
            postsWithDesignApprouches,
            designApprouchesCollectionData,
            designApprouchFilter
        );

    const filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear =
        getPostsLatestBrandingDate(filteredPostsBasedOnDesignApprouchFilter, {
            lastPartInDateFormat: "year",
        });

    return filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear;
};

module.exports = { getAndPrepareDesignApprouchUsagePerYear };
