require("dotenv").config();
const Webflow = require("webflow-api");

let BRANDCOATDB;

const BRANDCOATAPI = new Webflow({
    token: process.env.BRANDCOAT_ACCESS_TOKEN,
});

const connectToSite = async () => {
    BRANDCOATDB = await BRANDCOATAPI.site({
        siteId: "5fb85f262823b4390bcfe076",
    });
};

const getBRANDCOATDB = () => {
    return BRANDCOATDB;
};

const getCollectionDataById = async (collectionId) => {
    if (!BRANDCOATDB) {
        await connectToSite();
    }
    const collection = await BRANDCOATDB.collection({
        collectionId: collectionId,
    });
    const collectionData = await getAllCollectionData(collection);

    return collectionData;
};

// since webflow only allows the requesting of only 100 element from a collection, we request and if we get 100 we request another 100 untill we get 0 or a number under 100
const getAllCollectionData = async (collection) => {
    let partialCollectionData = [];
    let collectionOffset = 0;
    let totalCollectionData = [];

    do {
        partialCollectionData = await collection.items({
            offset: collectionOffset,
        });
        totalCollectionData.push(...partialCollectionData);
        collectionOffset += 100;
    } while (
        partialCollectionData.length > 0 &&
        partialCollectionData.length === 100
    );

    return totalCollectionData;
};

const getIndustriesCollectionData = async () => {
    const BRANDCOATDB = getBRANDCOATDB();
    if (!industriesCollectionData) {
        industriesCollectionData = getCollectionDataById(
            "63dd4fc33d98e62032c43f3b"
        );
    }
    return industriesCollectionData;
};

module.exports = {
    // getBRANDCOATDB,
    getCollectionDataById,
};
