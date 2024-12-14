const router = require("express").Router();
const ctrls = require("../controllers/insertData"); // Sử dụng controller cho Brand

// Tạo thương hiệu
router.post("/", ctrls.insertProduct);
router.post("/cate", ctrls.insertCategory);
router.post("/user", ctrls.insertUsers);

module.exports = router;
