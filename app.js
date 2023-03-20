require("dotenv");
require("express-async-errors");
const colorUsageGraphRouter = require("./routes/color_usage_graph.js");
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/colorusagegraph", colorUsageGraphRouter);

const port = process.env.PORT | 3002;

const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`server is listening on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
