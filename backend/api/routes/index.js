const express = require("express");
const ctrlUsers = require("../controllers/users");
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



module.exports = router;


