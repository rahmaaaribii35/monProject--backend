//importation mongoose
const mongoose = require('mongoose');

//create the user schema
const userSchema = new mongoose.Schema({

    firstName:String,
    lastName:String,
    email:{type:String , required: true, unique:true , lowercase:true},
    password:{type:String , required:true ,minLength:12},
    role:{type:String, enum:["client","admin" ,"..."]},
    age : Number,
    user_image : {type:String ,required:false},
    isActive:Boolean,

})

//exportation
const User = mongoose.model('User', userSchema);
module.exports = User;