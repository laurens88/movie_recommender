const mongoose = require("mongoose");
require ('../models/movieModel');
const {config} = require('../../config/config');

const MovieModel = mongoose.model("Movie");
const axios = require('axios');

const getMovies = (req, res) => {
    MovieModel.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error) => {
            res.status(404).json(error);
        });
}

const getMovie = (req, res) => {
    MovieModel.findOne({id: req.params.id})
        .then((movie) => {
            if (!movie) {
                addMovieFromTmdb(req, res);
                // res.status(404).json("Movie not found");
            } else {
                res.status(200).json(movie);
            }
        })
        .catch((error) => {
            res.status(404).json(error);
        });
}

// Get movie details from tmdb api and save to database
// const addMovieFromTmdb = (req, res) => {
//     axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${config.TMDB_API_KEY}`)
//         .then((response) => {
//             let movie = response.data;
//             axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${config.TMDB_API_KEY}`)
//                 .then((response) => {
//                     movie.credits = response.data;
//                     // return movie;
//                 })
//                 .catch((error) => {
//                     res.status(404).json(error);
//                 });
//             axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/images?api_key=${process.env.TMDB_API_KEY}`)
//                 .then((response) => {
//                     for (let i = 0; i < response.data.posters.length; i++) {
//                         if (response.data.posters[i].aspect_ratio > 1.5) {
//                             movie.poster_path = response.data.posters[i].file_path;
//                             break;
//                         }
//                     }
//                     if (!movie.poster_path) {
//                         movie.poster_path = response.data.backdrops[0].file_path;
//                     }
//                 })
//                 .catch((error) => {
//                     res.status(404).json(error);
//                 });
//             const newMovie = new MovieModel({
//                 id: movie.id,
//                 title: movie.title,
//                 yearReleased: parseInt(movie.release_date.split("-")[0]),
//                 genre: movie.genres[0].name,
//                 actors: movie.credits.cast.slice(0, 3).map(actor => actor.name),
//                 synopsis: movie.overview,
//                 poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//             });
//
//             newMovie.save()
//                 .then(() => {
//                     res.status(201).json("Movie added successfully");
//                 })
//                 .catch((error) => {
//                     res.status(400).json(error);
//                 });
//         })
//         .catch((error) => {
//             res.status(404).json(error);
//         });
// }
const addMovieFromTmdb = (req, res) => {
    console.log(config.TMDB_API_KEY);
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${config.TMDB_API_KEY}`)
        .then((response) => {
            let movie = response.data;
            let newMovie = null;
            return Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${config.TMDB_API_KEY}`),
                axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/images?api_key=${config.TMDB_API_KEY}&include_image_language=en%2Cnull`)
            ])
                .then((responses) => {
                    movie.credits = responses[0].data;
                    movie.poster_path = null;
                    for (let i = 0; i < responses[1].data.posters.length; i++) {
                        if (responses[1].data.posters[i].aspect_ratio > 1.5) {
                            console.log(responses[1].data.posters[i].aspect_ratio);
                            movie.poster_path = responses[1].data.posters[i].file_path;
                            break;
                        }
                    }

                    if (!movie.poster_path) {
                        // Sort the backdrops by vote count
                        let backdrops = responses[1].data.backdrops.sort((a, b) => b.vote_count - a.vote_count);
                        // Get the highest voted backdrop and in English, if possible
                        // Else get the highest voted backdrop
                        movie.poster_path = backdrops[0].file_path;
                        for (let i = 0; i < backdrops.length; i++) {
                            if (backdrops[i].iso_639_1 === "en") {
                                movie.poster_path = backdrops[i].file_path;
                                break;
                            }
                        }
                    }

                    newMovie = new MovieModel({
                        id: movie.id,
                        title: movie.title,
                        yearReleased: parseInt(movie.release_date.split("-")[0]),
                        genre: movie.genres[0].name,
                        actors: movie.credits.cast.slice(0, 3).map(actor => actor.name),
                        synopsis: movie.overview,
                        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    });

                    return newMovie.save();
                })
                .then(() => {
                    res.status(201).json(newMovie);
                })
                .catch((error) => {
                    res.status(400).json(error);
                });
        })
        .catch((error) => {
            res.status(404).json(error);
        });
}

// Recommend movies based on bert model similarity when the user inputs a prompt
const recommendMovies = (req, res) => {
    // Get the prompt from the request body
    const prompt = req.body.prompt;
    // Get the number of movies to recommend from the request body
    const numRecommendations = req.body.numRecommendations;
    // Get all movies from the database
    MovieModel.find()
        .then((movies) => {
            // Get the movie titles
            const movieTitles = movies.map(movie => movie.title);
            // Get the movie synopses
            const movieSynopses = movies.map(movie => movie.synopsis);
            // Get the movie genres
            const movieGenres = movies.map(movie => movie.genre);
            // Combine the movie titles, synopses, and genres into a single string
            const movieTexts = movieTitles.map((title, index) => title + " " + movieSynopses[index] + " " + movieGenres[index]);
            // Import the bert model
            const Bert = require('bert-as-service');
            // Connect to the bert server
            Bert.start();
            // Get the embeddings of the movie texts
            Bert.client.encode(movieTexts, {is_tokenized: true})
                .then((embeddings) => {
                    // Get the embedding of the prompt
                    Bert.client.encode([prompt], {is_tokenized: true})
                        .then((promptEmbedding) => {
                            // Calculate the cosine similarity between the prompt embedding and the movie embeddings
                            const similarities = embeddings.map((embedding) => {
                                return cosineSimilarity(promptEmbedding[0], embedding);
                            });
                            // Get the indices of the top numRecommendations movies with the highest similarity
                            const topIndices = similarities.map((similarity, index) => [similarity, index])
                                .sort((a, b) => b[0] - a[0])
                                .slice(0, numRecommendations)
                                .map(pair => pair[1]);
                            // Get the top numRecommendations movies
                            const recommendations = topIndices.map(index => movies[index]);
                            // Send the recommendations to the client
                            res.status(200).json(recommendations);
                            // Disconnect from the bert server
                            Bert.stop();
                        })
                        .catch((error) => {
                            res.status(404).json(error);
                            // Disconnect from the bert server
                            Bert.stop();
                        });
                })
                .catch((error) => {
                    res.status(404).json(error);
                    //
})})}


module.exports = { getMovies, getMovie, addMovieFromTmdb, recommendMovies};