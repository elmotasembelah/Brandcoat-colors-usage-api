const { countElements } = require("./countElements");
const { StatusCodes } = require("http-status-codes");

const startElementsUsageChart_v2 = async (req, res) => {
    const { industryfilter } = req.headers;

    const countedElements = await countElements(industryfilter);

    const elementsNames = Object.keys(countedElements);
    const amountoFCountedElements = Object.values(countedElements);
    const backgroundColor = [
        "#E91d14",
        "#0080ff",
        "#F6B600",
        "#00AC00",
        "#999EA1",
    ];

    res.status(StatusCodes.OK).json(
        (data = {
            labels: elementsNames,
            dataSets: [
                {
                    label: `Wuxing five elements in ${industryfilter}`,
                    data: amountoFCountedElements,
                    backgroundColor: backgroundColor,
                },
            ],
        })
    );
};

module.exports = { startElementsUsageChart_v2 };
