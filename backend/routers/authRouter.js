const router = require("express").Router();

const authController = require("../controllers/authController");
const fileUpload = require("../middleware/fileUpload");

router.post("/signup", fileUpload.single("image"), authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/loggedIn", authController.isLoggedIn);
router.get("/switch-role", authController.switchRole);

module.exports = router;
