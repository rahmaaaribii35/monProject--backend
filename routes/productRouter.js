var express = require('express');
var router = express.Router();


const uploadImageProduct = require('../middlewares/uploadImageProduct');

/*get users listing*/
const productController = require("../controllers/productController");

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.get('/getAvailableProducts', productController.getAvailableProducts);
router.get('/getOutOfStockProducts', productController.getOutOfStockProducts);
router.get('/getProductsByCategory/:category', productController.getProductsByCategory);
router.get('/getProductsByPriceRange', productController.getProductsByPriceRange);
router.get('/getSortProductsByPrice', productController.getSortProductsByPrice);
router.get('/getSortProductsByDate', productController.getSortProductsByDate);
router.get('/getProductsByDateRange', productController.getProductsByDateRange);


router.post('/addProduct', productController.addProduct);



module.exports=router;