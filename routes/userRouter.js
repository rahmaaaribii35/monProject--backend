var express = require('express');
var router = express.Router();
const uploadImageUser = require('../middlewares/uploadImageUser');
const isAdmin = require('../middlewares/isAdmin');
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddlewares");

/* GET users listing. */

router.get('/getAllUsers',auth, userController.getAllUsers);
router.get('/getUserById/:id',auth, userController.getUserById);
router.get('/getUserByAge/:age',auth, userController.getUserByAge);
router.get('/getUserStoredByFirstName',auth, userController.getUserStoredByFirstName);
router.get('/getUsersByCity/:city',auth, userController.getUsersByCity);

router.get('/searchUsersByFirstName',auth, userController.searchUsersByFirstName);

router.post('/addClient', userController.addClient);
router.post('/addClientWithImage', uploadImageUser.single('user_image'), userController.addClientWithImage);
router.post('/createAdmin', userController.createAdmin);


router.delete('/deleteUserById/:id',auth, userController.deleteUserById);

router.put('/updateUserById/:id',auth, uploadImageUser.single('user_image'), userController.updateUserById);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
