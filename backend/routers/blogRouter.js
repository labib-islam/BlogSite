const router = require("express").Router();
const auth = require("../middlewares/auth");
const fileUpload = require("../middlewares/file_upload");

const blogsController = require("../controllers/blogs_controller");

router.get("/", blogsController.getBlogs);
router.get("/user/:userId/:status", blogsController.getBlogsByUserId);

// -- Admin Routes
router.patch("/feedback/:bid", auth("admin"), blogsController.setBlogFeedback);

router.patch(
  "/status/:bid/:status",
  auth("admin"),
  blogsController.setBlogStatus
);
router.get("/:bid", blogsController.getBlogById);
router.post(
  "/new",
  auth("user"),
  fileUpload.single("image"),
  blogsController.createBlog
);
router.patch("/:bid", auth("user"), blogsController.updateBlog);
router.delete("/:bid", auth("user"), blogsController.deleteBlog);

module.exports = router;
