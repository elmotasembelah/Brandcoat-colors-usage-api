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

const getPostsColors = (postsCollectionData, colorsCollectionData) => {
    let postsColors = [];

    postsCollectionData.forEach((postData) => {
        postsColors.push({
            colors: getEachPostColorsNames(postData, colorsCollectionData),
        });
    });
    return postsColors;
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

const filterPostsBasedOnIndustry = (
    postsCollectionData,
    industriesCollectionData,
    industryFilter
) => {
    let filteredPosts = postsCollectionData.filter((post) => {
        postIndustry = getEachPostIndustriesNames(
            post,
            industriesCollectionData
        );
        if (postIndustry[0] === industryFilter) {
            return post;
        }
    });
    return filteredPosts;
};

const getPostsOldDesignDateAndNewDesignDate = (
    postsCollectionData,
    options = {}
) => {
    const { lastPartInDateFormat } = options;
    let lastPartInDateFormatIndex;
    switch (lastPartInDateFormat) {
        case "year":
            lastPartInDateFormatIndex = 4;
            break;
        case "month":
            lastPartInDateFormatIndex = 7;
            break;
        case "day":
            lastPartInDateFormatIndex = 10;
            break;
        default:
            lastPartInDateFormatIndex = 24;
    }
    const postsOldDesignDateAndNewDesignData = [];
    const oldDesignDateKey = "old-logo-relese-date";
    const newDesignDateKey = "date";
    postsCollectionData.forEach((postData) => {
        if (postData[oldDesignDateKey] && postData[newDesignDateKey])
            postsOldDesignDateAndNewDesignData.push({
                name: postData.name,
                oldDesignDate: postData[oldDesignDateKey].substring(
                    0,
                    lastPartInDateFormatIndex
                ),
                newDesignDate: postData[newDesignDateKey].substring(
                    0,
                    lastPartInDateFormatIndex
                ),
            });
    });
    return postsOldDesignDateAndNewDesignData;
};

const getElementsIdsOfColorsInPosts = (postsData, colorsData) => {
    const elementKey = "traditional-color-category";
    let elementsIdsOfColorsInPosts = [];
    const colorKey = "logo-color-palette";
    postsData.forEach((post) => {
        post[colorKey].forEach((postColor) => {
            colorsData.forEach((color) => {
                if (postColor === color._id) {
                    elementsIdsOfColorsInPosts.push(color[elementKey]);
                }
            });
        });
    });
    return elementsIdsOfColorsInPosts;
};

module.exports = {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getPostsColors,
    getAllPostsIndustriesNames,
    filterPostsBasedOnIndustry,
    getPostsOldDesignDateAndNewDesignDate,
    getElementsIdsOfColorsInPosts,
};
