const User = require("../models/User");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const jwt = require("jsonwebtoken");

const fs = require("fs");

const updateProfileImage = async (req, res) => {
  const uid = req.params.uid;

  if (uid !== req.userId) {
    res
      .status(401)
      .json({ message: "You are not allowed to edit this profile." });
  }

  const user = await User.findById(uid);

  // Upload image to Cloudinary
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "users",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(req.file.buffer); // Send buffer from multer's memoryStorage
  });

  const oldImagePublicId = user.imagePublicId;
  user.imageUrl = result.secure_url;
  user.imagePublicId = result.public_id;

  await user.save();

  // Delete image from Cloudinary
  cloudinary.uploader.destroy(oldImagePublicId, (error, result) => {
    if (error) {
      console.warn("Failed to delete image from Cloudinary:", error.message);
    }
  });

  // Creating new JWT with updated image path
  const newToken = jwt.sign(
    {
      username: user.username,
      userId: user._id,
      userEmail: user.email,
      image: user.imageUrl, // Updated image path
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  // Sending the new token in the cookie
  res
    .cookie("access_token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // required for cross-origin
    })
    .status(200)
    .json({ message: "Profile Updated" });
};

const getUserById = async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await User.findById(uid).select("-password");
    res.json({
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAllUsers = async (req, res) => {
  const search = req.query.search;
  try {
    const users = await User.aggregate([
      {
        $match: {
          role: "user",
          ...(search && { username: { $regex: search, $options: "i" } }),
        }, // Fetch only users with role 'user'
      },
      {
        $lookup: {
          from: "blogs",
          localField: "blogs",
          foreignField: "_id",
          as: "userBlogs",
        },
      },
      {
        $addFields: {
          blogCount: {
            $size: {
              $filter: {
                input: "$userBlogs",
                as: "blog",
                cond: { $ne: ["$$blog.status", "draft"] }, // Exclude draft blogs
              },
            },
          },
        },
      },
      {
        $project: {
          password: 0, // Exclude password for security
          userBlogs: 0, // Exclude full blog data
        },
      },
    ]);

    res.json({
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.uid;
  const sess = await mongoose.startSession();

  try {
    sess.startTransaction();
    const user = await User.findById(userId).populate("blogs").session(sess);

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    // Store blog image public IDs
    const imagePublicIds = user.blogs.map((blog) => blog.imagePublicId);
    imagePublicIds.push(user.imagePublicId);

    // Delete blogs
    await Blog.deleteMany({ _id: { $in: user.blogs } }).session(sess);

    // Delete user
    await User.findByIdAndDelete(userId).session(sess);

    // Commit the transaction
    await sess.commitTransaction();

    // Delete images AFTER committing transaction
    imagePublicIds.forEach((imagePublicId) => {
      // Delete image from Cloudinary
      cloudinary.uploader.destroy(imagePublicId, (error, result) => {
        if (error) {
          console.warn(
            "Failed to delete image from Cloudinary:",
            error.message
          );
        }
      });
    });

    res
      .status(200)
      .json({ message: "User and their blogs deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user." });
  } finally {
    sess.endSession();
  }
};

exports.updateProfileImage = updateProfileImage;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
