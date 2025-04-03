const router = require("express").Router();

const userController = require("../controllers/userController");
const fileUpload = require("../middleware/fileUpload");
const auth = require("../middleware/auth");

router.patch(
  "/:uid",
  auth("user"),
  fileUpload.single("image"),
  userController.updateProfileImage
);

module.exports = router;
