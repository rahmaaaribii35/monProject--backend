const userModel = require('../models/userModel');


// Get all users
module.exports.getAllUsers = async (req , res)=>{

    try {
        const userList = await userModel.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}

// Get user by ID
module.exports.getUserById = async (req , res)=>{

    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}

// Add a new client
module.exports.addClient = async (req , res)=>{

    try {
        const userData = req.body;
        userData.role="client";
        const user=new userModel(userData);
        const addedUser = await user.save();

        res.status(200).json(addedUser);

    } catch (error) {
        res.status(500).json({message: error.message});    
    }
}

