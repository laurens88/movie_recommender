const mongoose = require("mongoose");
const { config } = require("./config");

var dbURI = config.mongodb.dbURI;

if (process.env.NODE_ENV === "production") {
    dbURI = process.env.MONGODB_CLOUD_URI;
} else if (process.env.NODE_ENV === "docker") {
    dbURI = "mongodb://sp-pettany-mongod/newmedialab";
}

console.log(process.env.NODE_ENV);
console.log(dbURI);
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
    console.log(`Mongoose is connected to ${dbURI}.`);
});

mongoose.connection.on("error", (error) => {
    console.log("Mongoose connection error: ", error);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected.");
});

const gracefulShutdown = (message) => {
    mongoose.connection.close();
    console.log(`Mongoose has closed the connection through '${message}'.`);
};

// Nodemon restart
process.once("SIGUSR2", () => {
    gracefulShutdown("nodemon restart");
    process.kill(process.pid, "SIGUSR2");
});

// Application exit
process.on("SIGINT", () => {
    gracefulShutdown("application exit");
    process.exit(0);
});

// Application exit on Heroku
process.on("SIGTERM", () => {
    gracefulShutdown("application exit on Heroku");
    process.exit(0);
});

require("../api/models/userModel");

//
// require("./payments");
//
// require("./Ads");
//
// require("./userProfiles");