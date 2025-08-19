var express = require('express');
var router = express.Router();
const uploadImageUser = require('../middlewares/uploadImageUser');
const isAdmin = require('../middlewares/isAdmin');


/* GET users listing. */
const userController = require("../controllers/userController");

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUserByAge/:age', userController.getUserByAge);
router.get('/getUserStoredByFirstName/:firstName', userController.getUserStoredByFirstName);


router.post('/addClient', userController.addClient);
router.post('/addClientWithImage', uploadImageUser.single('user_image'), userController.addClientWithImage);


router.delete('/deleteUserById/:id', userController.deleteUserById);

module.exports = router;
