import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { Product } from "..";
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "BÁN CHẠY" },
  { id: 2, name: "SẢN PHẨM MỚI" },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold", limit: 10, sort: '-totalRatings' }), // Lấy sản phẩm bán chạy với đánh giá >= 4 sao
      apiGetProducts({ sort: "-createdAt", limit: 10 }), // Lấy 10 sản phẩm mới nhất
    ]);

    if (response[0]?.success) {
      setBestSellers(response[0].products);
    }
    if (response[1]?.success) {
      setNewProducts(response[1].products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 border shadow-lg rounded-lg bg-gray-50">
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <button
            key={el.id}
            className={`font-semibold capitalize px-4 py-2 cursor-pointer ${
              activedTab === el.id
                ? "text-red-400 bg-gray-100 shadow-md"
                : "text-black-400"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </button>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings}>
          {(activedTab === 1 ? bestSellers : newProducts)?.map((el,idx) => (
            <Product key={idx} productData={el} />
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default BestSeller;
