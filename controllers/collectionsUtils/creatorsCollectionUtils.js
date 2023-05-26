const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let creatorsCollectionData;

const getCreatorsCollectionData = async () => {
    if (!creatorsCollectionData) {
        creatorsCollectionData = await getCollectionDataById(
            "63dd4fc33d98e633bec43f3a"
        );
    }
    return creatorsCollectionData;
};

module.exports = { getCreatorsCollectionData };
