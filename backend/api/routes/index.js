const express = require("express");
const ctrlUsers = require("../controllers/users");
const ctrlMovies = require("../controllers/movies");
const expressJwt = require("express-jwt")
console.log(expressJwt);

const authentication = expressJwt.expressjwt({
    secret: "ShhItsASecret",
    requestProperty: "user",
    algorithms: ["HS256"],
});

const router = express.Router();

// Api to get user details
router.get("/users", authentication, ctrlUsers.getUser);

// Api to add user
router.post("/users", ctrlUsers.addUser);

// Sign in
router.post("/signin", ctrlUsers.signIn);
router.post("/movies/recommendations", (req, res, next) => {
    console.log('Recommendations route hit');
    next();
}, authentication, ctrlMovies.getRecommendations);

router.get("/movies/:id", ctrlMovies.getMovie);

router.get("/users/favorites", authentication, ctrlUsers.getFavoriteMovies);

router.get("/users/watched", authentication, ctrlUsers.getWatchedMovies);

router.get("/users/watchlist", authentication, ctrlUsers.getWatchlist);

router.get("/users/currentlywatching", authentication, ctrlUsers.getCurrentlyWatching);

router.delete("/users/currentlywatching", authentication, ctrlUsers.removeCurrentlyWatching);

router.post("/users/favorites/:id", authentication, ctrlUsers.addFavoriteMovie);

router.post("/users/watched/:id", authentication, ctrlUsers.addWatchedMovie);

router.post("/users/watchlist/:id", authentication, ctrlUsers.addWatchlistMovie);

router.post("/users/currentlywatching/:id", authentication, ctrlUsers.addCurrentlyWatchingMovie);

module.exports = router;


