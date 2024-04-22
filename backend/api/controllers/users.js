// const UserModel = require("../models/userModel");
const mongoose = require("mongoose");
require('../models/userModel');
require('../models/userProfileModel');
require("../models/movieModel");
const UserModel = mongoose.model("User");
const UserProfileModel = mongoose.model("UserProfile");
const MovieModel = mongoose.model("Movie");
const ObjectID = mongoose.Types.ObjectId;

// const getUser = (req, res) => {
//     res.send({ id: req.params.id, name: "John Doe", age: 25 })
// };

const addUser = (req, res) => {
    console.log("HEREEEE");
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.email) {

        console.log(req.body.username);
        console.log(req.body.password);
        console.log(req.body.firstName);
        console.log(req.body.email);

        res.redirect("/error");
    }
    else {
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        })

        const newUserProfile = new UserProfileModel({
            firstName: req.body.firstName,
            username: req.body.username,
            email: req.body.email
        })

        newUserProfile.save()
            .then(() => {
                newUser.save()
                    .then(() => {
                        res.status(201).json("Success");
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
};

// Define the getUser function
const getUser = (req, res) => {
    const loggedInUsername = req.user.username; // Extract username from JWT payload
    console.log("HERE")

    UserProfileModel.findOne({username: loggedInUsername})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                res.status(200).json(user);
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const getUserById = (req, res) => {
    UserProfileModel.findById(new ObjectID(req.user._id))
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                res.status(200).json(user);
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

// Check sign in
const signIn = (req, res) => {
    UserModel.findOne({username: req.body.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
                console.log("HERE")
            } else {
                user.comparePassword(req.body.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            console.log("HERE")
                            UserProfileModel.findOne({username: req.body.username})
                                .then((userProfile) => {
                                    if (!userProfile) {
                                        res.status(404).json("User not found");
                                    } else {
                                        res.status(200).json({token: user.generateJwt(userProfile.firstName)});
                                    }
                                })
                                .catch((error) => {
                                    res.status(400).json(error);
                                });

                        } else {
                            console.log("HERE")
                            res.status(401).json("Unauthorized");
                        }
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

// Get favorite movies

const getFavoriteMovies = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                // Fetch the favorite movies from the database using the movie IDs
                MovieModel.find({id: {$in: user.favoriteMovies}})
                    .then((movies) => {
                        res.status(200).json(movies);
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const getWatchedMovies = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                // Fetch the favorite movies from the database using the movie IDs
                MovieModel.find({id: {$in: user.watchedMovies}})
                    .then((movies) => {
                        res.status(200).json(movies);
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const getWatchlist = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                // Fetch the favorite movies from the database using the movie IDs
                MovieModel.find({id: {$in: user.watchlist}})
                    .then((movies) => {
                        res.status(200).json(movies);
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const getCurrentlyWatching = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                // Fetch the favorite movies from the database using the movie IDs
                MovieModel.find({id: {$in: user.currentlyWatching}})
                    .then((movies) => {
                        res.status(200).json(movies);
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const addFavoriteMovie = (req, res) => {
    console.log(req.user)
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                user.favoriteMovies.push(req.params.id);
                user.save()
                    .then(() => {
                        res.status(200).json("Success");
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const addWatchedMovie = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                user.watchedMovies.push(req.params.id);
                user.save()
                    .then(() => {
                        res.status(200).json("Success");
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const addWatchlistMovie = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                user.watchlist.push(req.params.id);
                user.save()
                    .then(() => {
                        res.status(200).json("Success");
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const addCurrentlyWatchingMovie = (req, res) => {
    UserProfileModel.findOne({username: req.user.username})
        .then((user) => {
            if (!user) {
                res.status(404).json("User not found");
            } else {
                user.currentlyWatching.push(req.params.id);
                user.save()
                    .then(() => {
                        res.status(200).json("Success");
                    })
                    .catch((error) => {
                        res.status(400).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

module.exports = {
    getUser,
    addUser,
    signIn,
    getUserById,
    getFavoriteMovies,
    getWatchedMovies,
    getWatchlist,
    getCurrentlyWatching,
    addFavoriteMovie,
    addWatchedMovie,
    addWatchlistMovie,
    addCurrentlyWatchingMovie
}