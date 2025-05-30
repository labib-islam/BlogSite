const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  color: { type: String, required: true, unique: true },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
