const router = require("express").Router();

const adminsController = require("../controllers/admins_controller");
const fileUpload = require("../middlewares/file_upload");

router.post("/signup", adminsController.signup);

module.exports = router;
