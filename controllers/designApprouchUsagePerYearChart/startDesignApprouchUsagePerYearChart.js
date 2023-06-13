const { startCount } = require("./countDesignApprouchUsagePerYear");
const { StatusCodes } = require("http-status-codes");

const startDesignApprouchUsagePerYearChart = async (req, res) => {
    const { designapprouchfilter } = req.headers;

    const countedDesignApprouchUsagePerYear = await startCount(
        designapprouchfilter
    );

    const years = Object.keys(countedDesignApprouchUsagePerYear);
    const designApprouchUsage = Object.values(
        countedDesignApprouchUsagePerYear
    );
    const chartColors = "#12121f";

    res.status(StatusCodes.OK).json({
        years,
        designApprouchUsage,
        chartColors,
    });
};

module.exports = { startDesignApprouchUsagePerYearChart };
