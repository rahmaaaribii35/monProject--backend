const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    comment:{type:String,required:true},
    date:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Avis", avisSchema);
