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
            case "6466901e48c87344a544e271":
                countedElements.Fire++;
                break;
            case "6466901e48c87344a544e26e":
                countedElements.Water++;
                break;
            case "6466901e48c87344a544e270":
                countedElements.Earth++;
                break;
            case "6466901e48c87344a544e26f":
                countedElements.Wood++;
                break;
            case "6466901e48c87344a544e26d":
                countedElements.Metal++;
                break;
            default:
        }
    });
    return countedElements;
};

module.exports = { countElements };
