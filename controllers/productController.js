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


module.exports.getProductById = async ( req,res)=>{

    try {

        const product = await productModel.findById(req.params.id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}



