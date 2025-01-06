const router = require("express").Router();
const auth = require("../middlewares/auth");
const fileUpload = require("../middlewares/file_upload");

const blogsController = require("../controllers/blogs_controller");

router.get("/", blogsController.getBlogs);
router.get("/:bid", blogsController.getBlogById);
router.post(
  "/new",
  auth,
  fileUpload.single("image"),
  blogsController.createBlog
);
router.patch("/:bid", auth, blogsController.updateBlog);

module.exports = router;
