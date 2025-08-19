var express = require('express');
var router = express.Router();

/* GET users listing. */
const userController = require("../controllers/userController");

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUserByAge/:age', userController.getUserByAge);
router.get('/getUserStoredByFirstName', userController.getUserStoredByFirstName);
router.get('/searchUserByFirstName', userController.searchUserByFirstName);


router.post('/addClient', userController.addClient);

router.delete('/deleteUserById/:id', userController.deleteUserById);

module.exports = router;
