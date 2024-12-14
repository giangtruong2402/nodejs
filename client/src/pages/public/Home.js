import React, { useEffect } from "react";
import DealDaily from "../../components/Coupons/DealDaily";
import Banner from "../../components/Banner/Banner";
import { BestSeller, FeatureProducts, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/user/asyncActions";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 1000);

    return () => clearTimeout(setTimeoutId);
  }, [isLoggedIn, dispatch]);
  
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        <div className="md:col-span-1 flex flex-col gap-6">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="md:col-span-3 flex flex-col gap-6">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 my-5">
        <FeatureProducts />
      </div>
    </>
  );
};

export default Home;
