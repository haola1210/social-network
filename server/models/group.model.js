const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { UserSchema } = require('./user.model')
const { PostSchema } = require('./post.model')

const GroupSchema = new Schema({
    groupId: String,
    name: String,
    username: String,
    password: String,
    members: [{
        type : Schema.Types.ObjectId,
		ref : "User"
    }],
    posts: [{
        type : Schema.Types.ObjectId,
		ref : "Post"
    }],
    typeGroup: String,
});


GroupSchema.pre('save', async function(next) {
	let group = this;
	const salt = await bcrypt.genSalt(10)
	group.password = await bcrypt.hash(group.password, salt)
	next();
})

const Group = model("Group", GroupSchema, "groups");

module.exports = Group;
module.exports.GroupSchema = GroupSchema;
