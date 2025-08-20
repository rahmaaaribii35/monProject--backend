var express = require('express');
var router = express.Router();


/* GET users listing. */
const categoryController = require("../controllers/categoryController");

router.get('/getAllCategories', categoryController.getAllCategories);

router.post('/addCategory', categoryController.addCategory);

router.delete('/deleteCategory/:id', categoryController.deleteCategory);

router.put('/updateCategory/:id', categoryController.updateCategory);

module.exports = router;