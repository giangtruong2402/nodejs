const router = require("express").Router();
const ctrls = require("../controllers/products");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/",[verifyAccessToken, isAdmin], ctrls.createProduct);

router.get("/",[verifyAccessToken, isAdmin], ctrls.getProducts);


router.put("/:pid",[verifyAccessToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid",[verifyAccessToken, isAdmin], ctrls.deleteProduct);

router.get("/:pid",[verifyAccessToken, isAdmin], ctrls.getProduct);


module.exports = router;