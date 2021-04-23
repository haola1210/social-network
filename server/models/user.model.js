const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    lastName: String,
    firstName: String,
    googleId: String,
    image: String,
    name: String,
    class: String,
});

const User = model("User", userSchema, "users");

module.exports = User;