const router = require("express").Router();
const ctrls = require("../controllers/blogs");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createrBlog);
router.get("/:bid", ctrls.getBlog);
router.put("/likeblog/:bid", verifyAccessToken, ctrls.likeBlog);
router.put("/dislikeblog/:bid", verifyAccessToken, ctrls.dislikeBlog);

router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
