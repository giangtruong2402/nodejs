import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { logout } from "../../store/user/userSlice";
const { AiOutlineLogout } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return (
      <div className="h-[38px] w-full bg- flex items-center justify-center">
        <span className="text-white">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="h-[50px] w-full bg-th flex items-center justify-center shadow-md">
      <div className="w-main flex items-center justify-between text-[15px] text-tht font-semibold">
        <span className="text-center">
          ĐẶT HÀNG ONLINE HOẶC GỌI CHO CHÚNG TÔI (+84) 834 891 120
        </span>
        {isLoggedIn && current ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              Xin chào, {current?.lastname} {current?.firstname}!
            </span>
            <AiOutlineLogout
              className="cursor-pointer gap-4 hover:rounded-full hover:bg-gray-200 hover:text-main"
              title="Đăng xuất"
              onClick={() => dispatch(logout())}
              size={20}
            />
            <Link>
            </Link>
          </div>
        ) : (
          <Link
            to={`/${path.LOGIN}`}
            className="hover:text-main hover:underline transition duration-300"
          >
            <span className="font-semibold">Đăng nhập hoặc Tạo tài khoản</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
