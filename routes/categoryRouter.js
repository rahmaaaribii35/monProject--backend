var express = require('express');
var router = express.Router();


/* GET users listing. */
const categoryController = require("../controllers/categoryController");

router.get('/getAllCategories', categoryController.getAllCategories);

module.exports = router;