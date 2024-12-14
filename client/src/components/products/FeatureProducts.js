import React, { useState, useEffect } from "react";
import { ProductCard } from "..";
import { apiGetProducts } from "../../apis";
const FeatureProducts = () => {
  const [products, settProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      page: 1,
      totalRatings: 5,
    });
    if (response.success) settProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full ">
      <div className="rounded-lg shadow-lg w-full border bg-gray-50">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-4 border-main ">
          SẢN PHẨM SẮP VỀ
        </h3>
        <div className="flex flex-wrap mt-[15px] mx-[-10px]">
          {products?.map((el) => (
            <ProductCard
              key={el._id}
              image={el.thumb}
              title={el.title}
              totalRatings={el.totalRatings}
              price={el.price}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4 ">
        <img
          src="//digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-[50%] object-contain transition-transform duration-300 hover:scale-105 hover:brightness-110"
        />
        <div className="flex flex-col justify-between gap-4 w-[24%]">
          <img
            src="//digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
            className="transition-transform duration-300 hover:scale-105 hover:brightness-110"
          />
          <img
            src="//digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
            className="transition-transform duration-300 hover:scale-105 hover:brightness-110"
          />
        </div>
        <img
          src="//digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="w-[24%] object-contain h-full transition-transform duration-300 hover:scale-105 hover:brightness-110"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
