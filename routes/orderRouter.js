var express = require('express');
var router = express.Router();


const orderController = require("../controllers/orderController");


router.get('/getAllOrders', orderController.getAllOrders);
router.get('/getOrderByUserId/:userId', orderController.getOrderByUserId);
router.get('/getOrderById/:id', orderController.getOrderById);

router.post('/createOrder', orderController.createOrder);


router.put('/updateOrderById/:id', orderController.updateOrderById);


router.delete('/deleteOrderById/:id', orderController.deleteOrderById);



module.exports = router;