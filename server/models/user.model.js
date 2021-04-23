const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    lastName: String,
    firstName: String,
    googleId: String,
    image: String,
    name: String,
    // email: "51800793@student.tdtu.edu.vn"
    // familyName: "Bảo Long"
    // givenName: "Trần"
    // googleId: "114207560817543528135"
    // imageUrl: "https://lh3.googleusercontent.com/-eMBTffHJaFQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnd2-0dpBZYmRjetdb8HcfDqCE0DA/s96-c/photo.jpg"
    // name: "Trần Bảo Long"
});

const User = model("User", userSchema, "users");

module.exports = User;