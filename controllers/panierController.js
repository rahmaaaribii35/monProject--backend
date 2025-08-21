const panierModel = require('../models/panierModel');
const productModel = require('../models/productModel');


//add product to panier :  betesh te5dem
module.exports.addProductToPanier = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "userId, productId, quantity are required" });
        }

        //tcheck ken mawjoud product fi panier
        let panierProduct = await panierModel.findOne({ user: userId, product: productId });

        if (panierProduct) {
            panierProduct.quantity += quantity;
            panierProduct.total = panierProduct.quantity * productModel.price;
        } else {
            panierProduct = new panierModel({
                user: userId,
                product: productId,
                quantity,
                price: productModel.price,
                total: productModel.price * quantity
            });
        }

        await panierProduct.save();
        res.status(200).json(panierProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get panier by panier 
module.exports.getPanierById = async(req,res)=>{
    try {
        const panier = await panierModel.findById(req.params.id).populate('user').populate('products.productId');

        if(!panier){
            return res.status(404).json({message:'panier not found'});
        }
        res.status(200).json(panier);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
},



// Get panier by user id
module.exports.getPanierByUserId = async (req, res) => {
    try {
        const panier = await panierModel.findOne({ user: req.params.userId }).populate('products.productId');
        if (!panier) {
            return res.status(404).json({ message: "Panier not found" });
        }
        res.status(200).json(panier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all paniers (for admin)
module.exports.getAllPaniers = async (req, res) => {
    try {
        const paniers = await panierModel.find().populate('user').populate('products.productId');
        res.status(200).json(paniers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove product from panier
module.exports.removeProductFromPanierById = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: "userId and productId are required" });
        }

        const panierProduct = await panierModel.findOneAndDelete({ user: userId, product: productId });

        if (!panierProduct) {
            return res.status(404).json({ message: "Product not found in panier" });
        }

        res.status(200).json({ message: "Product removed from panier", panierProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// clear panier
module.exports.clearPanier = async (req, res) => {
    try {
        const { userId } = req.body;
        const panier = await panierModel.findOne({ user: userId });
        if (!panier) {
            return res.status(404).json({ message: "Panier not found" });
        }

        panier.products = [];
        panier.cartTotal = 0;
        await panier.save();

        res.status(200).json({ message: "Panier cleared", panier });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update panier
module.exports.updatePanier = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "userId, productId, quantity are required" });
        }

        const panierProduct = await panierModel.findOne({ user: userId, product: productId });

        if (!panierProduct) {
            return res.status(404).json({ message: "Product not found in panier" });
        }

        panierProduct.quantity = quantity;
        panierProduct.total = quantity * productModel.price;

        await panierProduct.save();
        res.status(200).json(panierProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};