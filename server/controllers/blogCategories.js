const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createCategory: response ? response : "cant create new blog-category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("-createdAt -updatedAt");
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    categories: response ? response : "cannot get blog-category",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    updateCategories: response ? response : "cannot update blog-category",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid, req.body, {
    new: true,
  });
  return res.status(response ? 200 : 404).json({
    success: response ? true : false,
    deletedCategory: response
      ? "deleted blog-category"
      : "cannot blog-category",
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
