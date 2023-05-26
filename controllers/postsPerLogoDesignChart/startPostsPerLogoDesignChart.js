const { StatusCodes } = require("http-status-codes");
const { startCountDesignApprouches } = require("./countDesignApprouches");

const startPostsPerDesignApprouchChart = async (req, res) => {
    const { industryfilter } = req.headers;

    const countedDesignApprouches = await startCountDesignApprouches(
        industryfilter
    );

    const countedDesignApprouchesKeys = Object.keys(countedDesignApprouches);
    const countedDesignApprouchesValues = Object.values(
        countedDesignApprouches
    );

    const chartColor = "#12121f";

    res.status(StatusCodes.OK).json({
        countedDesignApprouchesKeys,
        countedDesignApprouchesValues,
        chartColor,
    });
};

module.exports = { startPostsPerDesignApprouchChart };
