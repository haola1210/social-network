const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
    faculty : String,

    role : String,          //user type "Student, Admin, Faculty/Room"
    manageGroup : [{        // what group that user allowed to write post? - Student-empty, Admin-all, Faculty/Room-option
        type: Schema.Types.ObjectId,
        ref : "Group"
    }],

    socketId : String,

});

UserSchema.pre('save', async function(next) {
	let user = this;
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	next();
})

const User = model("User", UserSchema, "users");

module.exports = User;
module.exports.UserSchema = UserSchema;