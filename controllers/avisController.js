const avisModel = require("../models/avisModel");


//add avis
module.exports.addAvis = async (req, res) => {
  try {
    const newAvis = new avisModel(req.body);
    const savedAvis = await newAvis.save();
    res.status(201).json(savedAvis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all avis
module.exports.getAllAvis = async (req, res) => {
  try {
    const avis = await avisModel.find();
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//delete avis by id
module.exports.deleteAvisById = async (req, res) => {
  try {
    const  id  = req.params.id;
    const avisDeleted = await avisModel.findByIdAndDelete(id);
    if (!avisDeleted) {
      return res.status(404).json({ message: "avis not found" });
    }
    res.status(200).json("avis deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update avis by ID
module.exports.updateAvisById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // check if avis exists
    const checkIfAvisExists = await Avis.findById(id);
    if (!checkIfAvisExists) {
      throw new Error("Avis not found!");
    }

    // update avis
    const updatedAvis = await Avis.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("user product"); // optional: populate user & product

    res.status(200).json({ message: "Avis updated successfully", avis: updatedAvis });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get avis by user id
module.exports.getAvisByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

        const avisList = await avisModel.find({user:userId}).populate('user','username email'); //populate to show user info

        if(!avisList || avisList.length === 0){
            return res.status(404).json({message:"No avis found for this user"});
        }

        res.status(200).json(avisList);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// get avis by product id
module.exports.getAvisByProductId = async(req,res)=>{
    try {
        const productId = req.params.productId;

        const avisList = await avisModel.find({product:productId}).populate('product', "name description price");

        if(!avisList || avisList.length ===0){
            return res.status(404).json({message:"No avis found for this product"});
        }

        res.status(200).json(avisList);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}