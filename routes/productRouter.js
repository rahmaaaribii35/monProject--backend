var express = require('express');
var router = express.Router();

/*get users listing*/
const productController = require("../controllers/productController");

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.get('/getAvailableProducts', productController.getAvailableProducts);
router.get('/getProductsByCategory/:category', productController.getProductsByCategory);

module.exports=router;