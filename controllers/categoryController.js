const categoryModel = require('../models/categoryModel');


// Get all categories
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add category
module.exports.addCategory = async (req, res) => {
  try {
    const newCategory = new categoryModel(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete category
module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update category by ID
module.exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // check if category exists
    const checkIfCategoryExists = await Category.findById(id);
    if (!checkIfCategoryExists) {
      throw new Error("Category not found!");
    }

    // update category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
