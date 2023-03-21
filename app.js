const express = require("express");
const app = express();

app.use((req, res) => {
    res.send("simple server connected ");
});

const startServer = () => {
    try {
        app.listen(3000, () => {
            console.log("listening on port 3000");
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
