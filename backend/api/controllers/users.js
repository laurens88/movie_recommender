// const UserModel = require("../models/userModel");
const mongoose = require("mongoose");
require('../models/userModel');
require('../models/userProfileModel');
const UserModel = mongoose.model("User");
const UserProfileModel = mongoose.model("UserProfile");

// const getUser = (req, res) => {
//     res.send({ id: req.params.id, name: "John Doe", age: 25 })
// };

const addUser = (req, res) => {
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
    UserProfileModel.findOne({username: req.params.username})
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
    UserProfileModel.findById(req.params.id)
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
                            res.status(200).json({token: user.generateJwt()});
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

// const addUser = (req, res) => {
//     if (!req.body.username || !req.body.password || !req.body.firstName ||
//         !req.body.lastName || !req.body.dateOfBirth || !req.body.numberOfPets || !req.body.location ||
//         !req.body.email) {
//         res.redirect("/error");
//     }
//     else {
//         const newUser = new UserModel({
//             username: req.body.username,
//             password: req.body.password
//         })
//
//         const newUserProfile = new UserProfileModel({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             username: req.body.username,
//             dateOfBirth: req.body.dateOfBirth,
//             numberOfPets: req.body.numberOfPets,
//             location: req.body.location,
//             email: req.body.email,
//             previousAds: 0
//         })
//
//         newUserProfile.save(function(error) {
//             if(error) {
//                 res.status(400).json(error);
//             } else {
//                 newUser.save(function(error) {
//                     if(error) {
//                         res.status(400).json(error);
//                     } else {
//                         res.status(201).json("Success");
//                     }
//                 })
//             }
//         })
//     }
// };

module.exports = {
    getUser,
    addUser,
    signIn
}