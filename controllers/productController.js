const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');


//get all products
module.exports.getAllProducts = async ( req,res)=>{

    try {
        const productList = await productModel.find().populate('category');;
        res.status(200).json(productList);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//get product by id
module.exports.getProductById = async ( req,res)=>{

    try {

        const product = await productModel.findById(req.params.id).populate('category');;
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//get all available products
module.exports.getAvailableProducts= async ( req,res)=>{

    try {

        const productList = await productModel.find({isAvailable : true}).populate('category');
        res.status(200).json(productList);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

//get out of stock products
module.exports.getOutOfStockProducts= async ( req,res)=>{

    try {

        const productList = await productModel.find({isAvailable : false}).populate('category');
        res.status(200).json(productList);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


//get products by category
module.exports.getProductsByCategory= async ( req,res)=>{

    try {
        const categoryid = req.params.category
        const productList = await productModel.find({category : categoryid}).populate('category');
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
        }).populate('category');

        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


// get products by date range
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
        }).populate('category');

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

        const productList= await productModel.find().sort({ price: sortOrder }).populate('category');
        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


// get products sorted by date
module.exports.getSortProductsByDate = async ( req , res)=>{
    try {
        let order = req.body.order;
        let sortOrder;
        if (order && order.toLowerCase() === "desc") {
            sortOrder = -1;
        } else {
            sortOrder = 1;
        }

        const productList= await productModel.find().sort({ dateAdded: sortOrder }).populate('category');
        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


//add product
module.exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Check if the category exists
        const categoryExists = await categoryModel.findById(productData.category);
        if (!categoryExists) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        if (productData.quantity > 0) {
           productData.isAvailable = true;
        } else {
           productData.isAvailable = false;
        }

        const product = new productModel(productData);
        const addedProduct = await product.save();
        res.status(201).json( await addedProduct.populate('category'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//add product with images
module.exports.addProductWithImages = async (req, res) => {
    try {
        const productData = req.body;

        if (req.files && req.files.length>0) {
           const filenames = req.files.map(file => file.filename);
           productData.images = filenames; 
        } 

        const product = new productModel(productData);
        const addedProduct = await product.save();

        res.status(201).json(await addedProduct.populate('category'));

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//delete product by id
module.exports.deleteProductById = async (req , res)=>{

    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}


// Update product by ID
module.exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Handle single image upload
    if (req.files && req.files.length > 0) {
      if (!updateData.images) {
        updateData.images = [];
      }
      req.files.forEach(file => {
        updateData.images.push(file.filename);
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category');

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
