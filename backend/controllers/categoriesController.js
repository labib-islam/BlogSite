const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({ categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const createCategory = async (req, res) => {
  try {
    const { category, color } = req.body;
    const newCategory = new Category({
      category,
      color,
    });

    const savedCategory = await newCategory.save();

    res.json({ category: savedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.cid);
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.deleteCategory = deleteCategory;
