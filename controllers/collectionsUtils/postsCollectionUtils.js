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

const getEachPostIndustriesNames = (postData, industriesCollectionData) => {
    let postIndustryName = [];
    const industryValueKey = "industry-sector-2";

    industriesCollectionData.forEach((industryData) => {
        if (postData[industryValueKey] === industryData._id)
            postIndustryName.push(industryData.name);
    });
    return postIndustryName;
};

const filterPostsBasedOnIndustry = (
    postsCollectionData,
    industriesCollectionData,
    industryFilter
) => {
    let filteredPosts = postsCollectionData.filter((post) => {
        const postIndustry = getEachPostIndustriesNames(
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

// ! this function is old needs to be merged with the function after it or to be removed since it uses an outdated key
const getElementsIdsOfColorsInPostsOld = (postsData, colorsData) => {
    const colorKey = "logo-color-palette";
    const elementKey = "traditional-color-category";
    let elementsIdsOfColorsInPosts = [];
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
const getElementsIdsOfColorsInPosts = (postsData, colorsData) => {
    const colorKey = "logo-color-palette";
    const elementKey = "elements";
    let elementsIdsOfColorsInPosts = [];
    postsData.forEach((post) => {
        post[colorKey].forEach((postColor) => {
            colorsData.forEach((color) => {
                if (postColor === color._id) {
                    color[elementKey].forEach((element) => {
                        elementsIdsOfColorsInPosts.push(element);
                    });
                }
            });
        });
    });
    return elementsIdsOfColorsInPosts;
};

const filterPostsWithNoAgencies = (postsCollectionData) => {
    let postsWithAgencies = [];
    postsCollectionData.filter((postData) => {
        if (
            postData.creator &&
            postData.creator[0] &&
            postData.creator[0] !== "63dd4fc33d98e6c584c440e2" &&
            postData.creator[0] !== "63dd4fc33d98e610b9c4423f"
        ) {
            postsWithAgencies.push(postData);
        }
    });
    return postsWithAgencies;
};

const filterPostsBasedOnAgency = (
    postsCollectionData,
    creatorsCollectionData,
    agencyFilter
) => {
    let filteredPosts = [];
    postsCollectionData.forEach((postData) => {
        const postCreators = getEachPostCreators(
            postData,
            creatorsCollectionData
        );

        postCreators.forEach((postCreator) => {
            if (postCreator === agencyFilter) {
                filteredPosts.push(postData);
            }
        });
    });
    return filteredPosts;
};

const getEachPostCreators = (postData, creatorsCollectionData) => {
    let matchedAgencies = [];

    creatorsCollectionData.forEach((creatorData) => {
        const postCreators = postData.creator;
        postCreators.forEach((creator) => {
            if (creatorData._id === creator) {
                matchedAgencies.push(creatorData.name);
            }
        });
    });
    return matchedAgencies;
};

const filterPostsWithNoDesignApprouches = (postsCollectionData) => {
    const colorValueKey = "types-of-logo-2";
    const coloredPostsData = postsCollectionData.filter((post) => {
        return post[colorValueKey];
    });
    return coloredPostsData;
};

const getAllPostsDesignApprouchessNames = (
    postsCollectionData,
    designApprouchesCollectionData
) => {
    let allPostsDesignApprouchesNames = [];
    postsCollectionData.forEach((postData) => {
        allPostsDesignApprouchesNames.push(
            getEachPostDesignApprouchesNames(
                postData,
                designApprouchesCollectionData
            )
        );
    });
    return allPostsDesignApprouchesNames;
};

const getEachPostDesignApprouchesNames = (
    postData,
    designApprouchesCollectionData
) => {
    let postDesignApprouchesNames = [];
    const designApprouchValueKey = "types-of-logo-2";

    designApprouchesCollectionData.forEach((designApprouchData) => {
        const postDesignApprouches = postData[designApprouchValueKey];
        postDesignApprouches.forEach((postDesignApprouch) => {
            if (postDesignApprouch === "Animated") {
            }
            if (postDesignApprouch === designApprouchData._id)
                postDesignApprouchesNames.push(designApprouchData.name);
        });
    });
    return postDesignApprouchesNames;
};

module.exports = {
    getPostsCollectionData,
    filterPostsWithNoColors,
    getPostsColors,
    getAllPostsIndustriesNames,
    getEachPostIndustriesNames,
    filterPostsBasedOnIndustry,
    getPostsOldDesignDateAndNewDesignDate,
    getElementsIdsOfColorsInPostsOld,
    getElementsIdsOfColorsInPosts,
    filterPostsWithNoAgencies,
    filterPostsBasedOnAgency,
    getEachPostCreators,
    filterPostsWithNoDesignApprouches,
    getAllPostsDesignApprouchessNames,
    getEachPostDesignApprouchesNames,
};
