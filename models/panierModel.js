const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required:true
    },

    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },

            name:{
                type:String,
                required: true
            },

            price:{
                type:Number,
                required:true
            },

            quantity:{
                type:Number,
                default:1,
                min:1
            },

            total:{
                type:Number,
                required:true
            }

        }
    ],

    cartTotal:{
        type:Number,
        default:0,
    },

    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Panier',panierSchema);