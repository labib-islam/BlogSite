const router = require("express").Router();

const categoriesController = require("../controllers/categories_controller");
const auth = require("../middlewares/auth");

router.get("/", categoriesController.getCategories);

router.post("/new", auth("admin"), categoriesController.createCategory);

router.delete("/:cid", auth("admin"), categoriesController.deleteCategory);

module.exports = router;
