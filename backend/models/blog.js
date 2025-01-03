const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  publication_date: { type: Date, required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
