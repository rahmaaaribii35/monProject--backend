// importation mongoose
const mongoose = require('mongoose');

// create the product schema
const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    images: [{ type: String }], // array of image URLs
    isAvailable: { type: Boolean, default: true },
    dateAdded: { type: Date, default: Date.now },
});

// exportation
const Product = mongoose.model('Product', productSchema);
module.exports = Product;