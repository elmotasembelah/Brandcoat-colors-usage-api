const {
    getAndPrepareElementalUsageChartData,
} = require("./getAndPrepareElementalUsageChartData");

const countElements = async () => {
    const elementsIdsOfColorsInPosts =
        await getAndPrepareElementalUsageChartData();

    const countedElements = startCountingElements(elementsIdsOfColorsInPosts);

    return countedElements;
};

const startCountingElements = (elementsIdsOfColorsInPosts) => {
    const countedElements = {
        fire: 0,
        water: 0,
        earth: 0,
        wood: 0,
        metal: 0,
    };

    elementsIdsOfColorsInPosts.forEach((elementId) => {
        switch (elementId) {
            case "2dbd912b027b9a1247d10e067f221b94":
                countedElements.fire++;
                break;
            case "9f4449a48ac1f9d83d2e0df7137088eb":
                countedElements.water++;
                break;
            case "7a82d9598e1a629982846a666cb9e819":
                countedElements.earth++;
                break;
            case "a3d63417603580866a2b3a880a840574":
                countedElements.wood++;
                break;
            case "f31e251a4b0a9978b03d47f31c7d142c":
                countedElements.metal++;
                break;
            default:
        }
    });
    return countedElements;
};

module.exports = { countElements };
