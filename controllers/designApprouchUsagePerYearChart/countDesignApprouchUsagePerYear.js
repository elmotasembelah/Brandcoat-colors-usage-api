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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    filteredPostsBasedOnDesignApprouchFilterLatestBrandingYear.forEach(
        (filteredPostLatestBrandingYear) => {
            if (
                filteredPostLatestBrandingYear >= 2018 &&
                filteredPostLatestBrandingYear < currentYear
            ) {
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
