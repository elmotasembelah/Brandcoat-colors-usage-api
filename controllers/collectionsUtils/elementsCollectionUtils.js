const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let elementsCollectionData = "";

const getElementsCollectionData = async () => {
    if (!elementsCollectionData) {
        elementsCollectionData = await getCollectionDataById(
            "64666945ded5e85b5dd22ade"
        );
    }
    return elementsCollectionData;
};

module.exports = { getElementsCollectionData };
