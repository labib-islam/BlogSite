const User = require("../models/User");
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

  const oldImagePath = user.imageUrl;
  user.imageUrl = req.file.path;

  await user.save();

  fs.unlink(oldImagePath, (err) => {
    console.error(err);
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
    .cookie("access_token", newToken, { httpOnly: true })
    .status(200)
    .json({ message: "Profile Updated" });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: { role: "user" }, // Fetch only users with role 'user'
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

    console.log(users);
    res.json({
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.updateProfileImage = updateProfileImage;
exports.getAllUsers = getAllUsers;
