require("dotenv").config();
const Webflow = require("webflow-api");

let brandCoatDB;
let postsCollectionData;
let colorsCollectionData;
let industriesCollectionData;

const BRANDCOATAPI = new Webflow({
    token: process.env.BRANDCOAT_ACCESS_TOKEN,
});

const getColorUsageGraphData = async (reqBody, res) => {
    const { industryFilter } = reqBody;
    if (!industriesCollectionData) {
        brandCoatDB = await connectToSite();
        postsCollectionData = await getPostsCollectionData(brandCoatDB);
        colorsCollectionData = await getColorsCollectionData(brandCoatDB);
        industriesCollectionData = await getIndustriesCollectionData(
            brandCoatDB
        );
    }

    const postsColorsAndIndustryNames = getPostsColorsAndIndustryNames(
        postsCollectionData,
        colorsCollectionData,
        industriesCollectionData
    );
    const colorsNamesAndHexValues =
        filterColorsNamesAndHexvalues(colorsCollectionData);

    return {
        postsColorsAndIndustryNames,
        colorsNamesAndHexValues,
    };
};

const connectToSite = async () => {
    const brandCoatDB = await BRANDCOATAPI.site({
        siteId: "5fb85f262823b4390bcfe076",
    });
    return brandCoatDB;
};

const getPostsCollectionData = async (brandCoatDB) => {
    const postsCollection = await brandCoatDB.collection({
        collectionId: "63dd4fc33d98e6335ac43f3c",
    });
    const postsCollectionData = await getAllCollectionData(postsCollection);
    // return postsCollectionData
    // ! this is added only for the color case ( some posts don't have colors )
    const coloredPostsData = filterPostsWithNoColors(postsCollectionData);
    // if ()
    return coloredPostsData;
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

const filterPostsWithNoColors = (postsCollectionData) => {
    const colorValueKey = "logo-color-palette";
    const coloredPostsData = postsCollectionData.filter((post) => {
        return post[colorValueKey];
    });
    return coloredPostsData;
};

const getColorsCollectionData = async (brandCoatDB, postsCollectionData) => {
    const colorsCollection = await brandCoatDB.collection({
        collectionId: "63dd4fc33d98e609bbc43f39",
    });

    const colorsCollectionData = await getAllCollectionData(colorsCollection);
    // return colorsCollectionData
    // ! this  is only added for the main colors case ( only working with main colors not all of them )
    const mainColorsData = getMainColorsData(colorsCollectionData);
    return mainColorsData;
};

const getMainColorsData = (colorsCollectionData) => {
    const main_colors = "main-colors";
    const colorIsSpecial = "special-fill";
    const mainColorsData = colorsCollectionData.filter((colorData) => {
        return colorData[main_colors] && !colorData[colorIsSpecial];
    });
    return mainColorsData;
};

const getIndustriesCollectionData = async (brandCoatDB) => {
    const industriesCollection = await brandCoatDB.collection({
        collectionId: "63dd4fc33d98e62032c43f3b",
    });
    const industriesCollectionData = await getAllCollectionData(
        industriesCollection
    );
    return industriesCollectionData;
};

const getPostsColorsAndIndustryNames = (
    postsCollectionData,
    colorsCollectionData,
    industriesCollectionData
) => {
    let postsColorsAndIndustryNames = [];

    postsCollectionData.forEach((postData) => {
        postsColorsAndIndustryNames.push({
            colors: getEachPostColorsNames(postData, colorsCollectionData),
            industry: getEachPostIndustrysName(
                postData,
                industriesCollectionData
            ),
        });
    });
    return postsColorsAndIndustryNames;
};

const getEachPostColorsNames = (postData, colorsCollectionData) => {
    let postColorsNames = [];
    const colorValueKey = "logo-color-palette";

    postData[colorValueKey].forEach((color) => {
        colorsCollectionData.forEach((colorData) => {
            if (color === colorData._id) postColorsNames.push(colorData.name);
        });
    });

    return postColorsNames;
};
const getEachPostIndustrysName = (postData, industriesCollectionData) => {
    let postIndustryName = [];
    const industryValueKey = "industry-sector-2";

    industriesCollectionData.forEach((industryData) => {
        if (postData[industryValueKey] === industryData._id)
            postIndustryName.push(industryData.name);
    });
    return postIndustryName;
};

const filterColorsNamesAndHexvalues = (colorsData) => {
    let colorsNamesAndHexValues = [];
    let colorHexValueKey = "the-color";
    colorsData.forEach((color) => {
        colorsNamesAndHexValues.push({
            name: color.name,
            hexValue: color[colorHexValueKey],
        });
    });
    return colorsNamesAndHexValues;
};

module.exports = { getColorUsageGraphData };
