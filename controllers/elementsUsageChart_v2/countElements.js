const {
    getAndPrepareElementsUsageChartData,
} = require("./getAndPrepareElementsUsageChartData");

const countElements = async (industryFilter) => {
    const elementsIdsOfColorsInPosts =
        await getAndPrepareElementsUsageChartData(industryFilter);

    const countedElements = startCountingElements(elementsIdsOfColorsInPosts);

    return countedElements;
};

const startCountingElements = (elementsIdsOfColorsInPosts) => {
    const countedElements = {
        Fire: 0,
        Water: 0,
        Earth: 0,
        Wood: 0,
        Metal: 0,
    };

    elementsIdsOfColorsInPosts.forEach((elementId) => {
        switch (elementId) {
            case "648fcf71981e8ad8659ee1bc":
                countedElements.Fire++;
                break;
            case "648fcf71981e8ad8659ee1b8":
                countedElements.Water++;
                break;
            case "648fcf71981e8ad8659ee1ba":
                countedElements.Earth++;
                break;
            case "648fcf71981e8ad8659ee1b9":
                countedElements.Wood++;
                break;
            case "648fcf71981e8ad8659ee1b7":
                countedElements.Metal++;
                break;
            default:
        }
    });
    return countedElements;
};

module.exports = { countElements };
