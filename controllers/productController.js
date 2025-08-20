const Product = require('../models/productModel');
const userModel = require('../models/userModel');

//get all products
module.exports.getAllProducts = async ( req,res)=>{

    try {
        const productList = await productModel.find();
        res.status(200).json(productList);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//get product by id
module.exports.getProductById = async ( req,res)=>{

    try {

        const product = await productModel.findById(req.params.id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//get all available products
module.exports.getAvailableProducts= async ( req,res)=>{

    try {

        const productList = await productModel.find({isAvailable : true});
        res.status(200).json(productList);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//get products by category
module.exports.getProductsByCategory= async ( req,res)=>{

    try {
        const category = req.params.category
        const productList = await productModel.find({category});
        res.status(200).json(productList);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

//get products by price range
module.exports.getProductsByPriceRange= async ( req,res)=>{

    try {
        const { min, max } = req.body;

        min = Number(min) || 0;
        max = Number(max) || Number.MAX_SAFE_INTEGER;

        const productList = await Product.find({ 
            price: { $gte: min, $lte: max } 
        });

        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}
