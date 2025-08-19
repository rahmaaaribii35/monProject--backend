var express = require('express');
var router = express.Router();

/* GET users listing. */
const userController = require("../controllers/userController");

router.get('/getAllUsers', userController.getAllUsers);


module.exports = router;
