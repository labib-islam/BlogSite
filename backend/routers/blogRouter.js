const router = require("express").Router();
const auth = require("../middlewares/auth");
const fileUpload = require("../middlewares/file_upload");

const blogsController = require("../controllers/blogs_controller");

router.post(
  "/new",
  auth,
  fileUpload.single("image"),
  blogsController.createBlog
);

module.exports = router;
