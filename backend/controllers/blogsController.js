const mongoose = require("mongoose");

const User = require("../models/User");
const Blog = require("../models/Blog");

const fs = require("fs");

const getPublishedBlogs = async (req, res) => {
  const search = req.query.search;
  const category = req.query.cat;

  try {
    const filter = {
      status: "published", // Ensure we always filter by published status
      ...(category && category !== "all" && { category }), // Add category filter if it's not "all"
      ...(search && { title: { $regex: search, $options: "i" } }), // Case-insensitive search in title
    };

    const blogs = await Blog.find(filter).populate(
      "author",
      "username imageUrl"
    );

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

const getBlogsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const status = req.params.status;
  const search = req.query.search;
  const category = req.query.cat;
  let userWithBlogs;

  if (req.role !== "admin" && req.userId !== userId) {
    return res
      .status(401)
      .json({ errorMessage: "You are not authorized to make this request" });
  }

  try {
    const filter = {
      ...(status && status !== "all" && { status }),
      ...(category && category !== "all" && { category }),
      ...(search && { title: { $regex: search, $options: "i" } }), // Case-insensitive search in title
    };

    userWithBlogs = await User.findById(userId).populate({
      path: "blogs",
      match: filter, // 👈 Only filter if status is NOT "all"
      populate: {
        path: "author",
        select: "username imageUrl",
      },
    });

    res.json({
      blogs: userWithBlogs.blogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, image, content, category } = req.body;
    const newBlog = new Blog({
      title,
      content: JSON.parse(content),
      imageUrl: req.file.path,
      category,
      author: req.userId,
      publication_date: Date.now(),
      status: req.query.status,
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

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username imageUrl");

    res.json({ blogs: blogs });
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
    blog.status = req.query.status;

    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteBlog = async (req, res) => {
  try {
    const bid = req.params.bid;

    const blog = await Blog.findById(bid).populate("author");

    if (blog.author.toString() !== req.userId) {
      res.json({ message: "You are not allowed to edit this blog." });
    }

    const imagePath = blog.imageUrl;

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await blog.deleteOne({ session: sess });
    blog.author.blogs.pull(blog);
    await blog.author.save({ session: sess });
    await sess.commitTransaction();

    fs.unlink(imagePath, (err) => {
      console.error(err);
    });
    res.status(200).json({ message: "Blog Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const setBlogStatus = async (req, res) => {
  try {
    const { bid, status } = req.params;
    const blog = await Blog.findById(bid);

    if (status == "published") {
      blog.set("feedback", undefined, { strict: false });
    }

    blog.status = status;

    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// -- Admin Controller
const setBlogFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const bid = req.params.bid;
    console.log(req.body);
    const blog = await Blog.findById(bid);

    blog.feedback = feedback;
    blog.status = "rejected";

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
exports.getBlogsByUserId = getBlogsByUserId;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
exports.setBlogFeedback = setBlogFeedback;
exports.setBlogStatus = setBlogStatus;
exports.getPublishedBlogs = getPublishedBlogs;
