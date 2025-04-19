const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  imagePublicId: { type: String, required: true }, // Cloudinary public ID
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, required: true, enum: ["admin", "user"] },
  blogs: [{ type: mongoose.Types.ObjectId, required: true, ref: "Blog" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
