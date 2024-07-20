const express = require("express");
const app = express();

app.get('/', function(req, res) {
    return res.json({
        message: "Welcome to my API!",
        success: true
    })
});

app.post('/', function(req, res) {
    return res.json({
        message: "Welcome :>",
        success: true
    })
});

app.listen(3000, () =>
    console.log("Server is running on port 3000!"),
);