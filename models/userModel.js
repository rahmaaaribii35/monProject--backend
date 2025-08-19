//importation mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create the user schema
const userSchema = new mongoose.Schema({

    firstName:String,
    lastName:String,
    email:{type:String , required: true, unique:true , lowercase:true},
    password:{type:String , required:true ,minLength:12},
    role: {type: String, enum: ["client", "admin"], default: "client"},
    age : Number,
    user_image : {type:String ,required:false},
    isActive:Boolean,

})

userSchema.pre('save' , async function(next){
    try{
    const salt = await bcrypt.genSalt();
    const user =this;
    user.password=await bcrypt.hash(user.password,salt);
    user.isActive=false; //Deactivated by def
    next();
    }catch(error){
        next(error);
    }
})

//exportation
const User = mongoose.model('User', userSchema);
module.exports = User;