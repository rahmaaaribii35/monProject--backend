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
    //address as an object 
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false }
    },

   avis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Avis' }],
   orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]

});



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


userSchema.static.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

//exportation
const User = mongoose.model('User', userSchema);
module.exports = User;