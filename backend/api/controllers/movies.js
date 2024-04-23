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
const getRecommendations = (req, res) => {
    console.log(req);
    // Get the prompt from the request body
    const prompt = req.body.prompt;
    // Get the number of movies to recommend from the request body
    const categories = req.body.categories;

    // Hard coded for now an array of movie ids
    const recommendations = [[123, 1], [771, 2], [1726, 3], [346698, 4], [258480, 5]];

    // Create an array to store the movie details
    let movieDetails = [];

    // Create a function to fetch a movie from the TMDB API and save it to the database
    const fetchAndSaveMovie = (id) => {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.TMDB_API_KEY}`)
            .then((response) => {
                let movie = response.data;
                let newMovie = null;
                return Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${config.TMDB_API_KEY}`),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${config.TMDB_API_KEY}&include_image_language=en%2Cnull`)
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
                    });
    })}

    // Use Promise.all to wait for all the movies to be fetched and saved
    Promise.all(recommendations.map((id_order) => {
        console.log(id_order[0]);
        return MovieModel.findOne({id: id_order[0]})
            .then((movie) => {
                if (movie) {
                    // If the movie exists in the database, add it to the movieDetails array
                    movieDetails.push({movie: movie, order: id_order[1]});
                } else {
                    // If the movie doesn't exist in the database, fetch it from the TMDB API and save it
                    return fetchAndSaveMovie(id_order[0])
                        .then((newMovie) => {
                            // Add the new movie to the movieDetails array
                            movieDetails.push({movie: newMovie, order: id_order[1]});
                            // movieDetails.push(newMovie);
                        });
                }
            });
    }))
        .then(() => {
            // Once all the movies have been processed, return the movieDetails array
            res.status(200).json(movieDetails);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}
// const getRecommendations = (req, res) => {
//     // Get the prompt from the request body
//     const prompt = req.body.prompt;
//     // Get the number of movies to recommend from the request body
//     const categories = req.body.categories;
//
//     // Hard coded for now an array of movie ids
//     const recommendations = [123, 771, 1726, 346698];
//
//     // Need to get movie details from the database but i want to do batch queries ubt some movies mught not be in the database
//     // So i will get the movie details from the tmdb api
//     // Then save the movie details to the database
//     // Then get the movie details from the database
//     // Then return the movie details to the user
//
//
//
//     res.status(200).json("Recommendations");
// }


module.exports = { getMovies, getMovie, addMovieFromTmdb, getRecommendations };