const {
    getAndPrePareLogoChangeFrequencyChartData,
} = require("./getAndPrepareLogoChangeFrequencyChartData");

const startCalculatingLogoChangeFrequency = async (industryFilter) => {
    const postsOldDesignDateAndNewDesignData =
        await getAndPrePareLogoChangeFrequencyChartData(industryFilter);

    const yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate =
        calculateYearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate(
            postsOldDesignDateAndNewDesignData
        );

    const roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate =
        calculateRoundedYearsDiffBetweenOldDesignDateAndNewDesignDate(
            yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate
        );

    const countedYears =
        countYearsDiffBetweenPostsOldDesignDateAndNewDesignDate(
            roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate
        );

    return countedYears;
};

const calculateYearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate =
    (postsOldDesignDateAndNewDesignData) => {
        let yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate =
            [];
        postsOldDesignDateAndNewDesignData.forEach((post) => {
            const oldDesignYear = parseInt(post.oldDesignDate.substring(0, 4));
            const newDesignYear = parseInt(post.newDesignDate.substring(0, 4));
            const yearsDifference = newDesignYear - oldDesignYear;

            const oldDesignMonth = parseInt(post.oldDesignDate.substring(5));
            const newDesignMonth = parseInt(post.newDesignDate.substring(5));
            const monthsDifference = newDesignMonth - oldDesignMonth;
            yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.push(
                {
                    name: post.name,
                    years: yearsDifference,
                    months: monthsDifference,
                }
            );
        });
        return yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate;
    };

const calculateRoundedYearsDiffBetweenOldDesignDateAndNewDesignDate = (
    yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate
) => {
    let roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate = [];
    yearsAndMonthsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.forEach(
        (post) => {
            switch (true) {
                case post.months < -6 && post.months >= -12:
                    roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.push(
                        {
                            years: post.years - 1 ? post.years - 1 : post.years,
                        }
                    );
                    break;
                case post.months <= 0:
                    roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.push(
                        {
                            years: post.years,
                        }
                    );
                    break;
                case post.months > 0 && post.months < 7:
                    roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.push(
                        {
                            years: post.years ? post.years : post.years + 1,
                        }
                    );
                    break;
                case post.months < 13:
                    roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.push(
                        {
                            years: post.years + 1,
                        }
                    );
                    break;
            }
        }
    );
    return roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate;
};

const countYearsDiffBetweenPostsOldDesignDateAndNewDesignDate = (
    roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate
) => {
    let countedYears = {};
    roundedYearsDifferenceBetweenPostsOldDesignDateAndNewDesignDate.forEach(
        (post) => {
            switch (post.years) {
                case 0:
                    break;
                case 1:
                    countedYears[1] ? countedYears[1]++ : (countedYears[1] = 1);
                    break;
                case 2:
                    countedYears[2] ? countedYears[2]++ : (countedYears[2] = 1);
                    break;
                default:
                    count = 0;
                    key = 2;
                    remainder = 0;
                    do {
                        remainder = post.years - 2 - count * 2;
                        key = key + 2;
                        count++;
                    } while (remainder > 2);
                    countedYears[key]
                        ? countedYears[key]++
                        : (countedYears[key] = 1);
            }
        }
    );
    return countedYears;
};

module.exports = { startCalculatingLogoChangeFrequency };
