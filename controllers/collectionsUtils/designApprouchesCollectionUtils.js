const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let designApprouchesCollectionData;

const getDesignApprouchesCollectionData = async () => {
    if (!designApprouchesCollectionData) {
        designApprouchesCollectionData = await getCollectionDataById(
            "648fcf71981e8ad8659edecf"
        );
    }
    return designApprouchesCollectionData;
};

module.exports = {
    getDesignApprouchesCollectionData,
};
