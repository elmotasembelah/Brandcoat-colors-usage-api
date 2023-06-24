const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let industriesCollectionData;

const getIndustriesCollectionData = async () => {
    if (!industriesCollectionData)
        industriesCollectionData = await getCollectionDataById(
            "648fcf71981e8ad8659ede76"
        );
    return industriesCollectionData;
};

const getMainMenuIndusries = (industriesCollectionData) => {
    const mainMenuKey = "main-menu";
    const mainMenuIndusries = industriesCollectionData.filter((industry) => {
        return industry[mainMenuKey];
    });
    return mainMenuIndusries;
};
module.exports = { getIndustriesCollectionData, getMainMenuIndusries };
