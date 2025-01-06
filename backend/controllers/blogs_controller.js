const mongoose = require("mongoose");

const User = require("../models/user");
const Blog = require("../models/blog");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username imageUrl");
    res.json({ blogs: blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getBlogById = async (req, res) => {
  const bid = req.params.bid;

  let blog;

  try {
    blog = await Blog.findById(bid).populate("author", "username imageUrl");
    res.json({
      blog: blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, image, content, category } = req.body;
    console.log(req.body);
    const newBlog = new Blog({
      title,
      content,
      imageUrl: req.file.path,
      category,
      author: req.userId,
      publication_date: Date.now(),
    });

    const user = await User.findById(req.userId);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newBlog.save({ session: sess });
    user.blogs.push(newBlog);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.json({ blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const bid = req.params.bid;

    const blog = await Blog.findById(bid);

    if (blog.author.toString() !== req.userId) {
      res.json({ message: "You are not allowed to edit this product." });
    }

    blog.title = title;
    blog.content = content;

    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.createBlog = createBlog;
exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.updateBlog = updateBlog;
