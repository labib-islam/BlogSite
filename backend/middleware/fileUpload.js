const multer = require("multer");
const uuid = require("uuid");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const fileUpload = multer({
  storage: multer.memoryStorage(),
});

module.exports = fileUpload;
