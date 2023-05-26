const {
    getAndPrepareNoAgenciesChartData,
} = require("./getAndPreparePostsPerDesignApprouchChartData");

const startCountDesignApprouches = async (industryFilter) => {
    let countedDesignApprouches = {
        Animated: 0,
        "Combination mark": 0,
        Emblem: 0,
        Lettermark: 0,
        Mascot: 0,
        Symbol: 0,
        Wordmark: 0,
    };
    let countedDesignApprouchesKeys = Object.keys(countedDesignApprouches);

    const postsDesignApprouchesNames = await getAndPrepareNoAgenciesChartData(
        industryFilter
    );

    countDesignApprouches(
        postsDesignApprouchesNames,
        countedDesignApprouches,
        countedDesignApprouchesKeys
    );
    return countedDesignApprouches;
};

const countDesignApprouches = (
    postsDesignApprouchesNames,
    countedDesignApprouches,
    countedDesignApprouchesKeys
) => {
    postsDesignApprouchesNames.forEach((postDesignApprouchesNames) => {
        postDesignApprouchesNames.forEach((postDesignApprouchName) => {
            if (countedDesignApprouchesKeys.includes(postDesignApprouchName)) {
                countedDesignApprouches[postDesignApprouchName]++;
            }
        });
    });
};

module.exports = { startCountDesignApprouches };
