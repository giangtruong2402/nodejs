import React from "react";
import Slider from "react-slick";
const Banner = () => {
  const images = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/oppo-find-x8-mo-ban-home-6-12-24.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.webp",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tecno-camon-30s-banner-home.webp",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/samsung-s24-ultra-home-20-11.webp",
  ];
  const settings = {
    infinite: true,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
  };
  return (
    <div className="relative group w-full rounded-lg overflow-hidden shadow-lg h-[400px]">
      <Slider {...settings} className="banner-slider">
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`banner ${index}`}
              className="h-[400px] w-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
