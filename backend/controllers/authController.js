const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

// -- Signup
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let result;

    if (req.file) {
      // Upload image to Cloudinary
      result = await new Promise((resolve, reject) => {
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
    }

    // Check for empty fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email exists.",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create and save new user to the DB
    const newUser = new User({
      username,
      email,
      imageUrl: result?.secure_url || "",
      imagePublicId: result?.public_id || "",
      password: hashedPassword,
      role: "user",
      blogs: [],
    });

    const savedUser = await newUser.save();

    // sign the token
    const token = jwt.sign(
      {
        username: savedUser.username,
        userId: savedUser._id,
        userEmail: savedUser.email,
        image: savedUser.imageUrl,
        role: savedUser.role,
      },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// -- Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ message: "Wrong email or password" });

    // Password Varification
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword)
      return res.status(401).json({ message: "Wrong email or password" });

    // sign the token
    const token = jwt.sign(
      {
        username: existingUser.username,
        userId: existingUser._id,
        userEmail: existingUser.email,
        image: existingUser.imageUrl,
        role: existingUser.role,
      },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const logout = (req, res) => {
  res.json({ token: "null" });
};

const isLoggedIn = (req, res) => {
  const nonVerifiedData = {
    verified: false,
    username: null,
    userId: null,
    userEmail: null,
    image: null,
    role: null,
  };

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token === "null") {
      return res.json(nonVerifiedData);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const verifiedData = {
      verified: true,
      username: verifiedToken.username,
      userId: verifiedToken.userId,
      userEmail: verifiedToken.userEmail,
      image: verifiedToken.image,
      role: verifiedToken.role,
    };

    res.send(verifiedData);
  } catch (err) {
    res.json(nonVerifiedData);
  }
};

const switchRole = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Switch role logic
    let newRole;
    if (verifiedToken.role === "user") {
      newRole = "test-admin";
    } else if (verifiedToken.role === "test-admin") {
      newRole = "user";
    } else {
      return res.status(400).json({ message: "Role cannot be switched" });
    }

    // Create new token with modified role
    const newToken = jwt.sign(
      {
        username: verifiedToken.username,
        userId: verifiedToken.userId,
        userEmail: verifiedToken.userEmail,
        image: verifiedToken.image,
        role: newRole,
      },
      process.env.JWT_SECRET
    );

    res.json({ newToken });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong during role switch." });
  }
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.isLoggedIn = isLoggedIn;
exports.switchRole = switchRole;
