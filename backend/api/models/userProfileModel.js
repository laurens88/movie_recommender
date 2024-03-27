const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String}
})

mongoose.model("UserProfile", UserProfileSchema, "UserProfiles");
