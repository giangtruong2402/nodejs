import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Public,
  Home,
  FAQ,
  Service,
  DetailProduct,
  Blogs,
  ResetPassword,
  Products,
  FinalRegister,
} from "./pages/public";
import path from "./ultils/path";
import { getCategories } from "./store/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin,
  CreateProduct,
  DashBoard,
  ManageOrder,
  ManageProduct,
  ManageUser,
} from "pages/admin";
import { Modal } from "components";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]); // Đảm bảo thêm 'dispatch' để ESLint không cảnh báo

  return (
    <div className="min-h-screen font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.SERVICES} element={<Service />} />
          <Route path={path.PRODUCTS} element={<Products />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />

        <Route path={path.LOGIN} element={<Login />} />
        {/* ADMIN */}
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.DASH_BOARD} element={<DashBoard />} />
          <Route path={path.MANAGER_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGER_USER} element={<ManageUser />} />
          <Route path={path.MANAGER_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
