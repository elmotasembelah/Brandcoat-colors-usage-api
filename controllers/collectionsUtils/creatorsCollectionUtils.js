const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let creatorsCollectionData;

const getCreatorsCollectionData = async () => {
    if (!creatorsCollectionData) {
        creatorsCollectionData = await getCollectionDataById(
            "648fcf71981e8ad8659edeb5"
        );
    }
    return creatorsCollectionData;
};

module.exports = { getCreatorsCollectionData };
