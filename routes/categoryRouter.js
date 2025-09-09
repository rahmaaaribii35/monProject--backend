var express = require('express');
var router = express.Router();

const auth = require("../middlewares/authMiddlewares");


/* GET users listing. */
const categoryController = require("../controllers/categoryController");


router.get('/getAllCategories', categoryController.getAllCategories);

router.post('/addCategory', auth, categoryController.addCategory);


router.delete('/deleteCategory/:id', auth, categoryController.deleteCategory);

router.put('/updateCategory/:id', auth, categoryController.updateCategory);

module.exports = router;