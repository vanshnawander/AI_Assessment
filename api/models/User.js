const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String,
    Organization:String,

},{timestamps:true});

const UserModel =mongoose.model('User',UserSchema);

module.exports = UserModel;