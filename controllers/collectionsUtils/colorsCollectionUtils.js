const { getCollectionDataById } = require("../databaseUtils/databaseUtils");

let colorsCollectionData;

const getColorsCollectionData = async () => {
    if (!colorsCollectionData) {
        colorsCollectionData = await getCollectionDataById(
            "63dd4fc33d98e609bbc43f39"
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

module.exports = {
    getColorsCollectionData,
    getMainColorsData,
    removeColorByNameFromColorsCollectionData,
    filterColorsNamesAndHexvalues,
};
