import React, { useState, useEffect, useCallback } from "react";
import { createSearchParams, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Product, SearchItem, InputSelect } from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import { sorts } from "ultils/contants";
const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);
  const { categories = [] } = useSelector((state) => state.app);
  const [params] = useSearchParams();
  const { category } = useParams();
const [sort, setSort] = useState("")
  const fetchProductsByCategory = async (queries) => {
    try {
      const response = await apiGetProducts(queries);
      if (response.success) {
        setProducts(response.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries(params.entries());

    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };

      delete queries.price;
    }
    if (queries.from) queries.price = { gte: queries.from };
    if (queries.to) queries.price = { lte: queries.to };
    delete queries.to;
    delete queries.from;

    fetchProductsByCategory({ ...priceQuery, ...queries });
  }, [params]);

  const changeActiveFilter = useCallback((name) => {
    setActiveClick((prev) => (prev === name ? null : name));
  }, [activeClick]);

  const categoryTitle = Array.isArray(categories)
    ? categories.find((el) => el.url === category)?.title
    : null;
const changeValue = useCallback((value) => {
  setSort(value)
},[sort])
useEffect(() => {
  navigate({
    pathname: `/${category}`,
    search: createSearchParams({sort }).toString(),
  });
},[sort])
  return (
    <div className="w-full ">
      <div className="h-[81px] flex justify-center items-center font-semibold bg-gray-100">
        <div className="w-main">
          <h3 className="font-main uppercase">{categoryTitle || "Sản phẩm"}</h3>
          <Breadcrumb category={categoryTitle || "Sản phẩm"} />
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-3 m-auto bg-gray-100 rounded-lg shadow-lg">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Lọc</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="giá"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />
            <SearchItem
              name="màu"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-3">
        <span className="font-semibold text-sm">Sắp xếp theo</span>
        <div className="w-full">
          <InputSelect  changeValue={changeValue} value={sort} options={sorts}/>
        </div>
        </div>
      </div>
      <div className="mt-3 w-main m-auto border bg-gray-100 p-4 rounded-lg shadow-lg">
        {" "}
        {/* Đổi bg-main thành bg-gray-200 và thêm padding */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid mx-[-10px] p-4" // Điều chỉnh khoảng cách bên ngoài cho lưới
          columnClassName="my-masonry-grid_column"
        >
          {products.length > 0 ? (
            products.map((el) => (
              <div
                key={el._id}
                className="product-card-wrapper mb-4 p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl" // Thêm các lớp Tailwind CSS ở đây
              >
                <Product
                  key={el._id}
                  pid={el._id}
                  productData={el}
                  normal={true}
                  className="w-full"
                />
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </Masonry>
      </div>

      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Products;
