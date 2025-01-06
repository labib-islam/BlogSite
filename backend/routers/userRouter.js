const router = require("express").Router();

const usersController = require("../controllers/users_controller");
const fileUpload = require("../middlewares/file_upload");

router.post("/signup", fileUpload.single("image"), usersController.signup);
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);
router.get("/loggedIn", usersController.isLoggedIn);

module.exports = router;
