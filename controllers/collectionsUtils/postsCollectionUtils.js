const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let postsCollectionData;

const getPostsCollectionData = async () => {
    if (!postsCollectionData) {
        postsCollectionData = await getCollectionDataById(
            "63dd4fc33d98e6335ac43f3c"
        );
    }
    return postsCollectionData;
};

const filterPostsWithNoColors = (postsCollectionData) => {
    const colorValueKey = "logo-color-palette";
    const coloredPostsData = postsCollectionData.filter((post) => {
        return post[colorValueKey];
    });
    return coloredPostsData;
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
            industry: getEachPostIndustriesNames(
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
const getEachPostIndustriesNames = (postData, industriesCollectionData) => {
    let postIndustryName = [];
    const industryValueKey = "industry-sector-2";

    industriesCollectionData.forEach((industryData) => {
        if (postData[industryValueKey] === industryData._id)
            postIndustryName.push(industryData.name);
    });
    return postIndustryName;
};

const getAllPostsIndustriesNames = (
    postsCollectionData,
    industriesCollectionData
) => {
    let allPostsIndustriesNames = [];
    postsCollectionData.forEach((postData) => {
        allPostsIndustriesNames.push(
            getEachPostIndustriesNames(postData, industriesCollectionData)
        );
    });
    return allPostsIndustriesNames;
};

module.exports = {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getPostsColorsAndIndustryNames,
    getAllPostsIndustriesNames,
};
