const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let colorsCollectionData;

const getColorsCollectionData = async () => {
    if (!colorsCollectionData) {
        colorsCollectionData = await getCollectionDataById(
            "648fcf71981e8ad8659ede5e"
        );
    }
    return colorsCollectionData;
};

const getMainColorsData = (colorsCollectionData) => {
    const main_colors = "main-colors";
    const colorIsSpecial = "special-fill";
    const mainColorsData = colorsCollectionData.filter((colorData) => {
        return colorData[main_colors] && !colorData[colorIsSpecial];
    });
    return mainColorsData;
};

// ? color has to be sent capitalized for this function to work
const removeColorByNameFromColorsCollectionData = (
    colorsCollectionData,
    color
) => {
    const colorsCollectionDataWithoutWhite = colorsCollectionData.filter(
        (colorData) => {
            return colorData.name !== color;
        }
    );
    return colorsCollectionDataWithoutWhite;
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

const getColorsElementsAndIds = (colorsData) => {
    const elementKey = "traditional-color-category";
    const colorNameAndElement = [];
    colorsData.forEach((color) => {
        colorNameAndElement.push({
            name: color.name,
            colorId: color._id,
            element: color[elementKey],
        });
    });
    return colorNameAndElement;
};

const getColorElement = (color) => {
    const elementKey = "traditional-color-category";
    return color[elementKey];
};

module.exports = {
    getColorsCollectionData,
    getMainColorsData,
    removeColorByNameFromColorsCollectionData,
    filterColorsNamesAndHexvalues,
    getColorsElementsAndIds,
    getColorElement,
};
