const router = require("express").Router();
const ctrls = require("../controllers/brands"); // Sử dụng controller cho Brand
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Tạo thương hiệu
router.post("/", [verifyAccessToken, isAdmin], ctrls.createBrand);

// Lấy danh sách thương hiệu
router.get("/", ctrls.getBrands);

// Cập nhật thương hiệu
router.put("/:brandid", [verifyAccessToken, isAdmin], ctrls.updateBrand);

// Xóa thương hiệu
router.delete("/:brandid", [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
