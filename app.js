require("dotenv");
require("express-async-errors");
const chartsRouter = require("./routes/charts.js");
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

app.get("/api/", (req, res) => {
    res.send("connected");
});

app.use("/api/charts", chartsRouter);

app.use((req, res) => res.status(404).send("Route does not exist"));

const port = process.env.PORT || 3000;

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
