const router = require("express").Router();
const ctrls = require("../controllers/orders");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], ctrls.createOrder);
router.get("/", [verifyAccessToken], ctrls.getUserOder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrder);

router.put("/status/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatus);
// router.put('/dislikeblog/:bid', verifyAccessToken, ctrls.dislikeBlog)

// router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)
// router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)

module.exports = router;
