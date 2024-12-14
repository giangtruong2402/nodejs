import React, { useState } from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import { showModal } from "store/appSlice";
import { Cart } from "components/carts";

const { RiPhoneFill, MdEmail, FaUserCircle, IoMdClose } = icons;

const Header = () => {
  const [isShowAccount, setIsShowAccount] = useState(false);
  const dispatch = useDispatch();
  const { currentCart } = useSelector((state) => state.user);

  return (
    <div className="h-[80px] w-full bg-main flex items-center justify-center shadow-md">
      {isShowAccount && (
        <ShowAccount
          isShowAccount={isShowAccount}
          setIsShowAccount={setIsShowAccount}
        />
      )}
      <div className="w-main flex items-center justify-between text-[15px] text-white font-semibold">
        <Link to={`/${path.HOME}`} className="flex items-center">
          <img src={logo} alt="logo" className="w-[150px] object-contain" />
        </Link>
        <div className="flex items-center gap-8">
          <div className=" bg-white/10 hover:bg-white/20 rounded-md flex flex-col items-center px-4  h-[50px] transition duration-200">
            <span className="flex gap-2 items-center">
              <RiPhoneFill size={18} />
              <span className="font-medium  ">(+84) 967 908 570</span>
            </span>
            <span>Thứ 2 - Thứ 7: 9:00 - 22:00</span>
          </div>
          <div className=" bg-white/10 hover:bg-white/20 rounded-md flex flex-col items-center px-4  h-[50px] transition duration-200">
            <span className="flex gap-2 items-center">
              <MdEmail size={16} />
              <span className="font-medium ">HOTRO@GIANGPHONE.COM</span>
            </span>
            <span>Hỗ trợ 24/7</span>
          </div>
          <div
            className="bg-white/10 hover:bg-white/20 rounded-md cursor-pointer flex items-center justify-center gap-2 px-4  h-[50px] transition duration-200"
            onClick={() =>
              dispatch(
                showModal({ isShowModal: true, modalChildren: <Cart /> })
              )
            }
          >
            <AiOutlineShoppingCart className="hover:text-black" size={18} />
            <div className="p-1 bg-black/30 font-medium rounded-md">
              {currentCart.length}
            </div>
          </div>
          <div
            className=" cursor-pointer flex items-center justify-center px-4 gap-2 transition duration-200 bg-white/10 h-[50px] hover:bg-white/20 rounded-md"
            onClick={() => setIsShowAccount((prev) => !prev)}
          >
            <FaUserCircle className="hover:text-black" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ShowAccount = ({ isShowAccount, setIsShowAccount }) => {
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    isShowAccount && (
      <div
        className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-20"
        onClick={() => setIsShowAccount(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-5 flex flex-col gap-3 rounded-md animate-scale-in-center"
        >
          <div className="flex items-center justify-center relative">
            {current?.avatar ? (
              <div
                className={`w-[80px] h-[80px] flex items-center rounded-full border p-[2px] ${
                  current?.isBlocked ? "border-main" : "border-green-500"
                }`}
              >
                <img
                  src={current?.avatar}
                  alt={`avatar ${current?.firstname} ${current?.lastname}`}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            ) : (
              <span className="text-main">
                <FaUserCircle size={35} />
              </span>
            )}

            <span
              className="absolute -top-5 -right-5 cursor-pointer"
              onClick={() => setIsShowAccount(false)}
            >
              <IoMdClose size={30} />
            </span>
          </div>
          <span
            onClick={() => setIsShowAccount(false)}
            className="flex justify-center"
          >
            <span className="px-1">Tài khoản</span>{" "}
            <Link
              to={`/${path.MEMBER}/${path.PERSONAL}`}
              target="_blank"
              className="hover:text-main transition-all"
            >
              {current?.firstname + " " + current?.lastname}
            </Link>
          </span>
          <span className="flex gap-4 justify-center">
            <Link
              to={`/${path.MEMBER}/${path.PERSONAL}`}
              target="_blank"
              onClick={() => setIsShowAccount(false)}
              className="hover:text-main transition-all"
            >
              Tài khoản của tôi
            </Link>
            <span>/</span>
            <Link
              to={path.WISHLIST}
              onClick={() => setIsShowAccount(false)}
              className="hover:text-main transition-all"
            >
              Sản phẩm yêu thích
            </Link>
            {current?.role === "admin" && (
              <>
                <span>/</span>
                <Link
                  to={`/${path.ADMIN}/${path.DASH_BOARD}`}
                  target="_blank"
                  onClick={() => setIsShowAccount(false)}
                  className="hover:text-main transition-all"
                >
                  Quản trị viên
                </Link>
              </>
            )}
            <span>/</span>
            <span
              onClick={() => {
                dispatch(logout());
                setIsShowAccount(false);
              }}
              className="hover:text-main transition-all cursor-pointer"
            >
              Đăng xuất
            </span>
          </span>
        </div>
      </div>
    )
  );
};
