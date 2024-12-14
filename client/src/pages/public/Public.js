import React from "react";
import { Outlet } from "react-router-dom";
import { Header, TopHeader, Footer } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-image-main">
      <TopHeader />
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
