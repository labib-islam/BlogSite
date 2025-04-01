const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Object, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  publication_date: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["draft", "pending", "published", "archived", "rejected"],
  },
  feedback: { type: String },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
