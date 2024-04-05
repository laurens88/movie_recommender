
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

UserSchema.pre("save", function (next) {
    const user = this;

    bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(user.password, salt);
        })
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => {
            next(err);
        });
});

UserSchema.methods.comparePassword = function(password) {
    console.log("HERE");
    return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateJwt = function () {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);
    let role = "user";

    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            exp: parseInt(expiryDate.getTime() / 1000),
            role: role
        },
        "ShhItsASecret"
    );
};


mongoose.model("User", UserSchema, "Users");