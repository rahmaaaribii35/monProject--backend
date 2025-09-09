var express = require('express');
var router = express.Router();
const uploadImageUser = require('../middlewares/uploadImageUser');
const isAdmin = require('../middlewares/isAdmin');
const userController = require("../controllers/userController");

/* GET users listing. */

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUserByAge/:age', userController.getUserByAge);
router.get('/getUserStoredByFirstName', userController.getUserStoredByFirstName);
router.get('/getUsersByCity/:city', userController.getUsersByCity);

router.get('/searchUsersByFirstName', userController.searchUsersByFirstName);

router.post('/addClient', userController.addClient);
router.post('/addClientWithImage', uploadImageUser.single('user_image'), userController.addClientWithImage);
router.post('/createAdmin', userController.createAdmin);


router.delete('/deleteUserById/:id', userController.deleteUserById);

router.put('/updateUserById/:id', uploadImageUser.single('user_image'), userController.updateUserById);

router.post('/login', userController.login);

module.exports = router;
