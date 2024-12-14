const Brand = require("../models/brand"); // Sử dụng model Brand
const asyncHandler = require("express-async-handler");

// Tạo mới một thương hiệu
const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createBrand: response ? response : "Cannot create new brand",
  });
});

// Lấy danh sách thương hiệu
const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find().select("-createdAt -updatedAt");
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    brands: response ? response : "Cannot get brands",
  });
});

// Cập nhật thông tin thương hiệu
const updateBrand = asyncHandler(async (req, res) => {
  const { brandid } = req.params; // Sử dụng tham số brandid để nhận diện thương hiệu
  const response = await Brand.findByIdAndUpdate(brandid, req.body, {
    new: true,
  });
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    updateBrand: response ? response : "Cannot update brand",
  });
});

// Xóa thương hiệu
const deleteBrand = asyncHandler(async (req, res) => {
  const { brandid } = req.params;
  const response = await Brand.findByIdAndDelete(brandid);
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    deletedBrand: response ? "Deleted brand" : "Cannot delete brand",
  });
});

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
