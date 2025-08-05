
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required:true},
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    role:{type:String, default:"user", required:true}

}, { timestamps: true });


const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };