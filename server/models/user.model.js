const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    username: { type: String, default: null },
    password: { type: String, default: null },
    image: { type: String, default: null },
    
    className: { type: String, default: null },
    faculty : { type: String, default: null },
    
    role : { type: String, default: "student" },          //user type "student, admin, faculty/room"
    manageGroup : [{        // what group that user allowed to write post? - Student-empty, Admin-all, Faculty/Room-option
        type: Schema.Types.ObjectId,
        ref : "Group"
    }],
    
    tokenId: { type: String, default: null },
    googleId: { type: String, default: null },
    socketId : {
    type: String,
        default: null
    },

});

UserSchema.pre('save', async function(next) {
	let user = this;
    if(user.password){
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    console.log(this)
	next();
})

const User = model("User", UserSchema, "users");

module.exports = User;
module.exports.UserSchema = UserSchema;