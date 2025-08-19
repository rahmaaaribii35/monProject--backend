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

// Get user by age
module.exports.getUserByAge = async (req , res)=>{

    try {
        const age = req.params.age;
        const user = await userModel.find({age:age});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}


module.exports.getUserStoredByFirstName = async (req , res)=>{

    try {
        const userList = await userModel.find().sort({firstName : 1});
        const count = userList.length;
        res.status(200).json({count, userList});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

module.exports.searchUserByFirstName = async (req , res)=>{

    try {
        const firstName = req.body.firstName;

        if (!firstName) {
            throw new Error("please select a name");
        }

        const userList = await userModel.find({
            firstName:{$regex:firstName , $options:"i"},
        });

        if (userList.length===0) {
            throw new Error("no user found with this name");
        }
        res.status(200).json({ userList});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}


module.exports.deleteUserById = async (req , res)=>{

    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully", user });
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

