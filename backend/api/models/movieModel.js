const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    yearReleased: {type: Number, required: true},
    genre: {type: String, required: true},
    actors: {type: Array, required: true},
    synopsis: {type: String, required: true},
    poster_url: {type: String, required: true}
});

mongoose.model("Movie", MovieSchema, "Movies");
