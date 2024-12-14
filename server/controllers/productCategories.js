const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createCategory: response ? response : "cant create new product-category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("-createdAt -updatedAt");
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    productcategories: response ? response : "cannot get product category",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    updateCategories: response ? response : "cannot update product category",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid, req.body, {
    new: true,
  });
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    deletedCategory: response
      ? "deleted product category"
      : "cannot delete product category",
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
