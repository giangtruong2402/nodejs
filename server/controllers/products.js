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
// Filltering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // Tách các trường đặc biệt ra khỏi query
    const excludefields = ["limit", "sort", "page", "fields"];
    excludefields.forEach((el) => delete queries[el]);
    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (macthedEl) => `$${macthedEl}`
    );
    const formatedQueries = JSON.parse(queryString);
    let colorQueryObject = {};
    // Filltering
    if (queries?.title)
      formatedQueries.title = { $regex: queries.title, $options: "i" };
    if (queries?.category)
      formatedQueries.category = { $regex: queries.category, $options: "i" };
    if (queries?.color) {
      delete formatedQueries.color;
      const colorArr = queries.color?.split(",");
      const colorQuery = colorArr.map((el) => ({
        color: { $regex: el, $options: "i" },
      }));
      colorQueryObject = { $or: colorQuery };
    }
    let queryObject = {};
    if (queries?.q) {
      delete formatedQueries.q;
      queryObject = {
        $or: [
          { color: { $regex: queries.q, $options: "i" } },
          { title: { $regex: queries.q, $options: "i" } },
          { category: { $regex: queries.q, $options: "i" } },
          { brand: { $regex: queries.q, $options: "i" } },
          { description: { $regex: queries.q, $options: "i" } },
        ],
      };
    }
    const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };
    let queryCommand = Product.find(qr);
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }
    // Fields limitimg
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }
    // Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);
    //Execute query
    try {
      const response = await queryCommand.exec();
      const counts = await Product.find(qr).countDocuments();
      return res.status(response ? 200 : 404).json({
        success: response ? true : false,
        counts,
        products: response ? response : "cannot get products",
      });
    } catch (err) {
      throw new Error(err.message);
    }
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
  const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) throw new Error("Missing inputs");
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find(
        (el) => el.posteBy.toString() === _id
      );
    if (alreadyRating) {
      // update star & comment
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRating },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            // "ratings.$.updateAt": updateAt,
          },
        },
        { new: true }
      );
    } else {
      // add star & comment
      await Product.findByIdAndUpdate(
        pid,
        {
          $push: { ratings: { star, comment, posteBy: _id } },
        },
        { new: true }
      );
    }
    //Sum rating
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce(
      (sum, el) => sum + +el.star,
      0
    );
    updatedProduct.totalRatings =
      Math.round((sumRatings * 10) / ratingCount) / 10;
    await updatedProduct.save();
    return res.status(200).json({
      success: true,
      updatedProduct,
    });
  });


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,

}