const productModel = require('../models/productModel');
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

//get out of stock products
module.exports.getOutOfStockProducts= async ( req,res)=>{

    try {

        const productList = await productModel.find({isAvailable : false});
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
        let { min, max } = req.body;

        min = Number(min) || 0;
        max = Number(max) || Number.MAX_SAFE_INTEGER;

        const productList = await productModel.find({ 
            price: { $gte: min, $lte: max } 
        });

        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//
module.exports.getProductsByDateRange= async ( req,res)=>{

    try {
        let { startDate, endDate } = req.body;

        if (startDate) {
            startDate = new Date(startDate); //if startDate exists, use it
        } else {
            startDate = new Date('1970-01-01'); //else , default 1970-01-01
        } 

        if (endDate) {
            endDate = new Date(endDate); //if endDate exists, use it
        } else {
            endDate = new Date(); //else , default today
        }

        const productList = await productModel.find({ 
            dateAdded: { $gte: startDate, $lte: endDate } 
        });

        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

// get products sorted by price
module.exports.getSortProductsByPrice = async ( req , res)=>{
    try {
        let order = req.body.order;
        let sortOrder;
        if (order && order.toLowerCase() === "desc") {
            sortOrder = -1;
        } else {
            sortOrder = 1;
        }

        const productList= await productModel.find().sort({ price: sortOrder });
        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


module.exports.getSortProductsByDate = async ( req , res)=>{
    try {
        let order = req.body.order;
        let sortOrder;
        if (order && order.toLowerCase() === "desc") {
            sortOrder = -1;
        } else {
            sortOrder = 1;
        }

        const productList= await productModel.find().sort({ dateAdded: sortOrder });
        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


//add product
module.exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;

        if (productData.quantity > 0) {
           productData.isAvailable = true;
        } else {
           productData.isAvailable = false;
        }

        const product = new productModel(productData);
        const addedProduct = await product.save();
        res.status(201).json(addedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
