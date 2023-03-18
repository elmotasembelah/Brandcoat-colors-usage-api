require("dotenv");
require("express-async-errors");
const colorUsageGraphRouter = require("./routes/color_usage_graph.js");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const app = express();

app.use(express.json());
app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: (15 * 60) ^ 1000,
        max: 100,
    })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/colorusagegraph", colorUsageGraphRouter);

const port = process.env.PORT | 3000;

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
