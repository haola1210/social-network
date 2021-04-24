const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    tokenId: String,
    username: String,
    password: String,
    email: String,
    lastName: String,
    firstName: String,
    googleId: String,
    image: String,
    name: String,
    class: String,
});

UserSchema.pre('save', async function(next) {
	let user = this;
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	next();
})

const User = model("User", UserSchema, "users");

module.exports = User;