const { countElements } = require("./countElements");
const { StatusCodes } = require("http-status-codes");

const startElementsUsageChart_v1 = async (req, res) => {
    const { industryfilter } = req.headers;

    const countedElements = await countElements(industryfilter);

    const elementsNames = Object.keys(countedElements);
    const amountoFCountedElements = Object.values(countedElements);
    const dataSetColor = [
        "rgb(75, 192, 192)", // Color at the start of the gradient
        "rgb(75, 15, 15)", // Color at the end of the gradient
    ];
    const dataSetLightColor = [
        "rgba(75, 192, 192, 0.2)", // Color at the start of the gradient
        "rgba(75, 14, 15, 0.8)", // Color at the end of the gradient
    ];

    res.status(StatusCodes.OK).json(
        (data = {
            labels: elementsNames,
            dataSets: [
                {
                    label: `Wuxing Five Elements in ${industryfilter}`,
                    data: amountoFCountedElements,
                    dataSetColor,
                    dataSetLightColor,
                    visible: true,
                },
            ],
        })
    );
};

module.exports = { startElementsUsageChart_v1 };
