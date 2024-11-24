const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('missing input')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success:newProduct? true : false,
        createdProduct: newProduct ? newProduct : 'cannot create new product'
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success:product? true : false,
        productData: product ? product : 'cannot get product'
    })
})
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find(); // Tìm tất cả sản phẩm từ bảng 'Product'
  
    return res.status(200).json({
      success: products ? true : false, // Nếu có sản phẩm thì `success = true`
      productData: products ? products : 'Cannot get product', 
      // Nếu lấy được sản phẩm, trả về `products`
      // Nếu không, trả về lỗi "Cannot get product"
    });
  });
  const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params; // Lấy ID sản phẩm từ URL
    if (req.body && req.body.title)
    {
        req.body.slug = slugify(req.body.title)
    } 
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
      return res.status(200).json({
        success: updateProduct? true : false,
        updateProduct: updateProduct ? updateProduct : "canot update product",
      });
  });
    
  const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params; // Lấy ID sản phẩm từ URL
    const deleteProduct = await Product.findByIdAndDelete(pid)
      return res.status(200).json({
        success: deleteProduct? true : false,
        deleteProduct: deleteProduct ? deleteProduct : "canot delete product",
      });
  });
  


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,

}