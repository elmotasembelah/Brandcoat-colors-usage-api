const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let designApprouchesCollectionData;

const getDesignApprouchesCollectionData = async () => {
    if (!designApprouchesCollectionData) {
        designApprouchesCollectionData = await getCollectionDataById(
            "63dd4fc33d98e679d3c43f3e"
        );
    }
    return designApprouchesCollectionData;
};

module.exports = {
    getDesignApprouchesCollectionData,
};
