const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// -- Signup
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for empty fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this email exists.",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // save new user to the DB
    const newUser = new User({
      username,
      email,
      imageUrl: req.file.path,
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
        image: savedUser.imageUrl,
        role: savedUser.role,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .send();
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
        .json({ errorMessage: "Please enter all required fields." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    // Password Varification
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    // sign the token
    const token = jwt.sign(
      {
        username: existingUser.username,
        userId: existingUser._id,
        image: existingUser.imageUrl,
        role: existingUser.role,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const logout = (req, res) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

const isLoggedIn = (req, res) => {
  const nonVerifiedData = {
    verified: false,
    username: null,
    userId: null,
    image: null,
    role: null,
  };

  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.json(nonVerifiedData);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const verifiedData = {
      verified: true,
      username: verifiedToken.username,
      userId: verifiedToken.userId,
      image: verifiedToken.image,
      role: verifiedToken.role,
    };

    res.send(verifiedData);
  } catch (err) {
    res.json(nonVerifiedData);
  }
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.isLoggedIn = isLoggedIn;
