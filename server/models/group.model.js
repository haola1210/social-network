const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');



const GroupSchema = new Schema({
    name: String,                           //ten: vd: Khoa CNTT
    code: String,                           // ma khoa hay ma phong ban
    members: [{                             //danh sach member
        type : Schema.Types.ObjectId,
		ref : "User"
    }],

});

const Group = model("Group", GroupSchema, "groups");

module.exports = Group;
module.exports.GroupSchema = GroupSchema;
