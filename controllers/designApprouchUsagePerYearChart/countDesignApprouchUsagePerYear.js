const {
    getAndPrepareDesignApprouchUsagePerYear,
} = require("./getAndPrepareDesignApprouchUsagePerYear");

const startCount = async (designApprouchFilter) => {
    const filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear =
        await getAndPrepareDesignApprouchUsagePerYear(designApprouchFilter);

    const countedDesignApprouchUsagePerYear = countDesignApprouchUsagePerYear(
        filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear
    );

    return countedDesignApprouchUsagePerYear;
};

const countDesignApprouchUsagePerYear = (
    filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear
) => {
    let countedDesignApprouchUsagePerYear = {};

    filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear.forEach(
        (filteredPostLatestBrandingYear) => {
            if (filteredPostLatestBrandingYear >= 2018) {
                countedDesignApprouchUsagePerYear[
                    filteredPostLatestBrandingYear
                ]
                    ? countedDesignApprouchUsagePerYear[
                          filteredPostLatestBrandingYear
                      ]++
                    : (countedDesignApprouchUsagePerYear[
                          filteredPostLatestBrandingYear
                      ] = 1);
            }
        }
    );

    return countedDesignApprouchUsagePerYear;
};

module.exports = { startCount };
