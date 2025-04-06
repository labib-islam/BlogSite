const router = require("express").Router();
// const auth = require("../middlewares/auth");
const fileUpload = require("../middleware/fileUpload");

const blogsController = require("../controllers/blogsController");
const auth = require("../middleware/auth");

router.get("/published", blogsController.getPublishedBlogs);

// -- Authorized Routes
router.post(
  "/user/new",
  auth("user"),
  fileUpload.single("image"),
  blogsController.createBlog
);

router.get("/user/:uid/blogs", blogsController.getBlogsByUserId);

router.get("/:bid", blogsController.getBlogById);

router.patch("/user/:bid", auth("user"), blogsController.updateBlog);

router.delete("/:bid", auth("user"), blogsController.deleteBlog);

router.get("/admin/blogs", auth("admin"), blogsController.getAllBlogs);

router.get(
  "/admin/count",
  auth("admin"),
  blogsController.getBlogsCountbyStatus
);

// router.get("/", auth("admin"), blogsController.getBlogs);

// router.get("/user/:userId/:status", blogsController.getBlogsByUserId);

// // -- Admin Routes
router.patch("/feedback/:bid", auth("admin"), blogsController.setBlogFeedback);

router.patch(
  "/status/:bid/:status",
  auth("admin"),
  blogsController.setBlogStatus
);

module.exports = router;
