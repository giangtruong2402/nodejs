import { AdminSidebar } from "components";
import withBase from "hocs/withBase";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import path from "ultils/path";

const Admin = ({ navigate }) => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    Swal.fire(
      "Oops!",
      "Bạn cần đăng nhập trước khi thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.LOGIN}`));
  if (current?.role !== "admin")
    Swal.fire(
      "Oops!",
      "Bạn cần có quyền admin để thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.HOME}`));

  return (
    <div className="w-full flex min-h-screen">
      <AdminSidebar />
      <div className="w-[17%]"></div>
      <main className="w-[83%] bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default withBase(Admin);
