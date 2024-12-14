import React, { memo } from "react";
import icons from "../../ultils/icons";

const { MdEmail, FaFacebookF, FaTwitter, FaPinterestP, FaGooglePlusG, FaLinkedinIn, FaDiscord } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      {/* Khu vực đăng ký nhận bản tin */}
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI
            </span>
            <small className="text-[13px] text-gray-300">
              Đăng ký ngay để nhận các ưu đãi hàng tuần
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-gray-200 placeholder:italic placeholder:opacity-50"
              type="text"
              placeholder="Email"
            />
            <div className="h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Phần thông tin */}
      <div className="h-auto w-full bg-gray-800 flex items-center justify-center text-white text-[13px]">
        <div className="w-main grid grid-cols-4 gap-8 py-8">
          {/* Cột VỀ CHÚNG TÔI */}
          <div className="flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              VỀ CHÚNG TÔI
            </h3>
            <span>
              <span>Địa chỉ: </span>
              <span className="opacity-70">
               26c,Ngõ 89 Lê Đức Thọ, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
              </span>
            </span>
            <span>
              <span>Điện thoại: </span>
              <span className="opacity-70">(+84)967908570</span>
            </span>
            <span>
              <span>Email: </span>
              <span className="opacity-70">giangtruong24020@gmail.com</span>
            </span>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/emsi.gt.3"><FaFacebookF className="cursor-pointer hover:text-main" /></a>
              <FaTwitter className="cursor-pointer hover:text-main" />
              <FaPinterestP className="cursor-pointer hover:text-main" />
              <FaGooglePlusG className="cursor-pointer hover:text-main" />
              <FaLinkedinIn className="cursor-pointer hover:text-main" />
              <FaDiscord className="cursor-pointer hover:text-main" />
            </div>
          </div>

          {/* Cột THÔNG TIN */}
          <div className="flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              THÔNG TIN
            </h3>
            <span>Bộ sưu tập</span>
            <span>Vị trí cửa hàng</span>
            <span>Ưu đãi hôm nay</span>
            <span>Liên hệ</span>
          </div>

          {/* Cột CHÚNG TÔI LÀ AI */}
          <div className="flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              CHÚNG TÔI LÀ AI
            </h3>
            <span>Hỗ trợ</span>
            <span>Miễn phí vận chuyển</span>
            <span>Câu hỏi thường gặp</span>
            <span>Đổi trả hàng</span>
            <span>Ý kiến khách hàng</span>
          </div>

          {/* Cột HASHTAG */}
          <div className="flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #GIANGPHONE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
