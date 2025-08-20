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

//get user by first name
module.exports.getUserStoredByFirstName = async (req , res)=>{

    try {
        const userList = await userModel.find().sort({firstName : 1});
        const count = userList.length;
        res.status(200).json({count, userList});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

//search user by first name
module.exports.searchUsersByFirstName = async (req, res) => {
  
  try {

        const { firstName } = req.body;

    if (!firstName) {
      throw new Error("Please select a name");
    }

    const userList = await userModel.find({
      firstName: { $regex: firstName, $options: "i" }, 
    });

    if (userList.length === 0) {
      throw new Error("Aucune Utilisateur trouve pour ce nom");
    }

    res.status(200).json({ userList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user by id
module.exports.deleteUserById = async (req , res)=>{

    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}

//get users by city
module.exports.getUsersByCity = async (req, res) => {
  try {
    const city = req.params.city;
    const usersList = await userModel.find({ "address.city": city });
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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


//add client with image
module.exports.addClientWithImage = async (req , res)=>{

    try {
        const userData = req.body;
        userData.role="client";

        if (req.file) {
            const filename = req.file.filename;
            userData.user_image=filename
         }
        const user=new userModel(userData);
        const addedUser = await user.save();

        res.status(200).json(addedUser);

    } catch (error) {
        res.status(500).json({message: error.message});    
    }
}


// Créer un admin 
module.exports.createAdmin = async (req, res) => {
  try {
    const adminExists = await userModel.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin déjà existant" });
    }

    const adminData = req.body;
    adminData.role = "admin";

    const admin = new userModel(adminData);
    const savedAdmin = await admin.save();

    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update user by ID
module.exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    if (req.file) {
      updateData.user_image = req.file.filename;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

