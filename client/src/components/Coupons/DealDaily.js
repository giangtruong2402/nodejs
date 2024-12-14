import React, { useState, useEffect, memo } from "react";
import { apiGetProducts } from "../../apis/product";
import { renderStarFromNumber, formatDiscountedMoney } from "../../ultils/helpers";
import  Countdown  from "./Countdown";
import Product from "../products/Product"; // Import thành phần Product
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";

const { AiFillStar } = icons;
let idInterval;

const DealDaily = () => {
  const [dealdaily, setDealdaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const safeParseJSON = (json) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      console.error("Failed to parse JSON", error);
      return null;
    }
  };

  useEffect(() => {
    const savedProduct = localStorage.getItem("dealdaily");
    const savedExpireTime = localStorage.getItem("expireTime");

    if (savedProduct && savedExpireTime) {
      const savedProductData = safeParseJSON(savedProduct);
      const savedExpireTimeValue = safeParseJSON(savedExpireTime);

      if (savedProductData && savedExpireTimeValue) {
        const remainingTime = savedExpireTimeValue - Date.now();
        if (remainingTime > 0) {
          setDealdaily(savedProductData);

          const h = Math.floor(remainingTime / (1000 * 60 * 60)) % 24;
          const m = Math.floor(remainingTime / (1000 * 60)) % 60;
          const s = Math.floor(remainingTime / 1000) % 60;

          setHour(h);
          setMinute(m);
          setSecond(s);
          return; 
        }
      }
    }
    fetchDealDaily();
  }, []);

  const fetchDealDaily = async () => {
    try {
      const response = await apiGetProducts({
        limit: 1,
        page: Math.round(Math.random() * 10),
        totalRatings: 5,
      });
      
      if (response.success) {
        setDealdaily(response.products[0]);

        const h = 24 - new Date().getHours();
        const m = 60 - new Date().getMinutes();
        const s = 60 - new Date().getSeconds();
        setHour(h);
        setMinute(m);
        setSecond(s);

        localStorage.setItem("dealdaily", JSON.stringify(response.products[0]));
        localStorage.setItem(
          "expireTime",
          JSON.stringify(Date.now() + h * 3600000 + m * 60000 + s * 1000)
        );
      } else {
        setHour(0);
        setMinute(59);
        setSecond(59);
      }
    } catch (error) {
      console.error("Failed to fetch deal daily", error);
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else if (minute > 0) {
        setMinute((prev) => prev - 1);
        setSecond(59);
      } else if (hour > 0) {
        setHour((prev) => prev - 1);
        setMinute(59);
        setSecond(59);
      } else {
        setExpireTime(!expireTime);
        fetchDealDaily();
      }
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, [hour, minute, second, expireTime]);

  return (
    <div className="border rounded-lg shadow-lg w-full flex-auto bg-gray-50">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          KHUYẾN MÃI
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        {dealdaily && (
          <Product productData={dealdaily} />
        )}
      </div>
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Giờ"} number={hour} />
          <Countdown unit={"Phút"} number={minute} />
          <Countdown unit={"Giây"} number={second} />
        </div>
        <Link
          to={`/product/${dealdaily?.category?.toLowerCase()}/${dealdaily?._id}/${dealdaily?.title}`}
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <span>Mua ngay</span>
        </Link>
      </div>
    </div>
  );
};

export default memo(DealDaily);
