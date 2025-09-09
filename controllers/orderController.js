const orderModel = require('../models/orderModel');



//get all orders 
module.exports.getAllOrders = async (req, res) => {
    try {
        const orderList = await orderModel.find().populate('user', 'name email').populate('products.productId', 'name price');
        res.status(200).json(orderList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get order by user id
module.exports.getOrderByUserId = async (req, res) => {
    try {
        const  userId  = req.params.userId;
        const orderList = await orderModel.find({ user: userId }).populate('products.productId', 'name price');
        res.status(200).json(orderList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get one order by id
module.exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId).populate('user', 'name email').populate('products.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete order by id
module.exports.deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({ message: "orderId is required" });
        }

        const order = await orderModel.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: "Order deleted successfully", order });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Create an order // fhmthesh // 
module.exports.createOrder = async (req, res) => {
    try {
        const { user, products, address, paymentMethod } = req.body;

        if (!user || !products || products.length === 0 || !address) {
            return res.status(400).json({ message: "User, products, and address are required" });
        }

        // Calculate total for each product and overall order total
        let orderTotal = 0;
        const productsWithTotal = products.map(item => {
            const total = item.price * item.quantity;
            orderTotal += total;
            return { ...item, total };
        });

        const newOrder = new orderModel({
            user,
            products: productsWithTotal,
            orderTotal,
            address,
            paymentMethod
        });

        const createdOrder = await newOrder.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update order by ID
module.exports.updateOrderById = async (req, res) => {
  try {
    const id  = req.params.id;
    const updateData = req.body;

    // check if order exists
    const checkIfOrderExists = await Order.findById(id);
    if (!checkIfOrderExists) {
      throw new Error("Order not found!");
    }

    // update order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("user").populate("products.productId"); // populate user and product details

    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

