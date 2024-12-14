import React, { useState } from "react";
import { formatMoney } from "../../ultils/helpers";
import { renderStarFromNumber } from "../../ultils/helpers";
import  SelectOption from "../Selects/SelectOption";
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";
const { FaRegEye, FiMenu, FaHeart } = icons;
const Product = ({ productData }) => {
  const [isShowOption, setisShowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px]">
      <Link
        className="w-full border p-[15px] flex flex-col items-center"
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setisShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setisShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className=" absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <SelectOption icons={<FaHeart />} />
              <SelectOption icons={<FiMenu />} />
              <SelectOption icons={<FaRegEye />} />
            </div>
          )}
          <img
            src={
              productData?.images[0] ||
              "https://tse1.mm.bing.net/th?id=OIP.KeKY2Y3R0HRBkPEmGWU3FwHaHa&pid=Api&P=0&h=180"
            }
            alt=""
            className="w-[274px] h-[274px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
