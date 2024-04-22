const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String},
    favoriteMovies: {type: Array},
    watchlist: {type: Array},
    currentlyWatching: {type: Array},
    watchedMovies: {type: Array},
})

mongoose.model("UserProfile", UserProfileSchema, "UserProfiles");
