var express = require('express');
var logger = require('morgan');
const cors = require('cors');


var app = express();

app.use(logger('dev'));

app.use(express.json());

app.use(cors());

var indexApi = require('./api/routes/index.js');

require('./config/db');

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use("/api", indexApi);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError")
        res.status(401).json({message: err.name + ": " + err.message + "."})
});

module.exports = app;
