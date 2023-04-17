const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let industriesCollectionData;

const getIndustriesCollectionData = async (brandCoatDB) => {
    if (!industriesCollectionData)
        industriesCollectionData = await getCollectionDataById(
            "63dd4fc33d98e62032c43f3b"
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
