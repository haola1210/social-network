const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');



const GroupSchema = new Schema({
    name: String,                           //ten: vd: Khoa CNTT
    
    members: [{                             //danh sach member
        type : Schema.Types.ObjectId,
		ref : "User"
    }],

});

const Group = model("Group", GroupSchema, "groups");

module.exports = Group;
module.exports.GroupSchema = GroupSchema;
