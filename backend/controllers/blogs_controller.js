const mongoose = require("mongoose");

const User = require("../models/user");
const Blog = require("../models/blog");

const createBlog = async (req, res) => {
  try {
    const { title, image, content, category } = req.body;

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

exports.createBlog = createBlog;
