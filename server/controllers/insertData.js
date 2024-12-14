const Product = require("../models/product");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const data = require("../../data/data2.json");
const slugify = require("slugify");
const categoryData = require("../../data/cate_brand");
const ProductCategory = require("../models/productCategory");
const users = require("../ultils/user");

// Tạo mới một sản phẩm
const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
    totalRatings:0
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  for (let product of data) {
    await fn(product); // Nạp dữ liệu theo thứ tự
  }
  return res.json("Done");
});

// Tạo mới một danh mục sản phẩm
const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    url: slugify(cate?.cate),
  });
};

const insertCategory = asyncHandler(async (req, res) => {
  for (let cate of categoryData) {
    await fn2(cate); // Nạp dữ liệu theo thứ tự
  }
  return res.json("Done");
});

const fn3 = async (user) => {
  await User.create(user);
};

const insertUsers = asyncHandler(async (req, res) => {
  const promiese = [];
  for (let user in users) promiese.push(fn3(user));
  await Promise.all(promiese);
  return res.status(200).json("Done");
});

module.exports = {
  insertProduct,
  insertCategory,
  insertUsers,
};
