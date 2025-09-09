const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name:{type: String , required : true , unique:true},
    description :{type:String },



    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

// fhmthesh 
//const Category = mongoose.model('Category', productSchema);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;