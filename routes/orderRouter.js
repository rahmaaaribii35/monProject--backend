var express = require('express');
var router = express.Router();

const auth = require("../middlewares/authMiddlewares");


const orderController = require("../controllers/orderController");


router.get('/getAllOrders', auth, orderController.getAllOrders);
router.get('/getOrderByUserId/:userId', auth, orderController.getOrderByUserId);
router.get('/getOrderById/:id', auth, orderController.getOrderById);

router.post('/createOrder', auth, orderController.createOrder);


router.put('/updateOrderById/:id', auth, orderController.updateOrderById);


router.delete('/deleteOrderById/:id', auth, orderController.deleteOrderById);



module.exports = router;