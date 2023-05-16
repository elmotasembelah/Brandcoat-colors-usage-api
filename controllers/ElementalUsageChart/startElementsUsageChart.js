const { countElements } = require("./countElements");
const { StatusCodes } = require("http-status-codes");

const startElementsUsageChart = async (req, res) => {
    const countedElements = await countElements();

    const elementsNames = Object.keys(countedElements);
    const amountoFCountedElements = Object.values(countedElements);
    const dataSetColor = "rgb(18, 18, 31)";
    const dataSetLightColor = "rgba(18,18,31,0.2)";

    res.status(StatusCodes.OK).json(
        (data = {
            labels: elementsNames,
            dataSets: [
                {
                    label: " Elements Usage in All Industries",
                    data: amountoFCountedElements,
                    dataSetColor,
                    dataSetLightColor,
                    visible: true,
                },
            ],
        })
    );
};

module.exports = { startElementsUsageChart };
