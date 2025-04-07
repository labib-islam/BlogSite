const router = require("express").Router();

const categoriesController = require("../controllers/categoriesController");
const auth = require("../middleware/auth");

router.get("/", categoriesController.getCategories);

router.post("/new", auth("admin"), categoriesController.createCategory);

router.delete("/:cid", auth("admin"), categoriesController.deleteCategory);

module.exports = router;
