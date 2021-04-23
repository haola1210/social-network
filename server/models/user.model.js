const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    googleId: String,
    
});

const User = model("User", userSchema, "users");

module.exports = User;