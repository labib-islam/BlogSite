const router = require("express").Router();

const userController = require("../controllers/userController");
const fileUpload = require("../middleware/fileUpload");
const auth = require("../middleware/auth");

router.get("/", auth(["admin", "test-admin"]), userController.getAllUsers);
router.get("/:uid", userController.getUserById);

router.patch(
  "/:uid",
  auth(["user"]),
  fileUpload.single("image"),
  userController.updateProfileImage
);

router.delete("/:uid", auth(["admin"]), userController.deleteUser);

module.exports = router;
