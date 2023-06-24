const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let elementsCollectionData = "";

const getElementsCollectionData = async () => {
    if (!elementsCollectionData) {
        elementsCollectionData = await getCollectionDataById(
            "648fcf71981e8ad8659edf23"
        );
    }
    return elementsCollectionData;
};

module.exports = { getElementsCollectionData };
