import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "apis";
import useDebounce from "../hooks/useDebounce";
import Swal from "sweetalert2"; // Import SweetAlert2

const { AiOutlineDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [bestprice, setBestPrice] = useState(null);

  // Hàm xử lý chọn checkbox
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) {
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
    changeActiveFilter(null);
  };

  // Lấy sản phẩm có giá cao nhất
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.products[0]?.price);
  };

  // Cập nhật URL khi selected thay đổi
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected, category, navigate]);

  // Gọi API nếu loại input là giá
  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  const deboucePriceFrom = useDebounce(price.from, 500);
  const deboucePriceTo = useDebounce(price.to, 700);

  // Kiểm tra giá trị nhập vào khi hoàn tất nhập ô "Đến"
  useEffect(() => {
    if (deboucePriceTo) {
      if ((Number(price.to) > bestprice ) ||(Number(price.from) > bestprice)) {
        Swal.fire({
          icon: "error",
          title: "Giá trị quá cao",
          text: `Giá trị không thể lớn hơn giá sản phẩm cao nhất: ${Number(
            bestprice
          ).toLocaleString()} VNĐ.`,
        });
      }
    }
  }, [deboucePriceTo, price.from, bestprice]);

  // Cập nhật URL khi giá trị thay đổi
  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) data.to = price.to;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [deboucePriceFrom, deboucePriceTo, navigate, category]);

  // Tự động điều chỉnh chiều rộng ô input
  const adjustInputWidth = (value) => {
    return `${Math.max(100, value.length * 10)}px`; // Chiều rộng tối thiểu 100px
  };

  return (
    <div
      className="p-3 cursor-pointer text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center hover:text-gray-800 hover:border-main transition-all"
      onClick={() => changeActiveFilter(name)}
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute top-[calc(100%+1px)] left-0 z-10 w-fit p-4 border bg-white min-w-[150px] shadow-lg rounded-md">
          {/* Loại checkbox */}
          {type === "checkbox" && (
            <div>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">
                  {`${selected.length} đã chọn`}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Đặt lại
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3 mt-4"
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      value={el}
                      onChange={handleSelect}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                      id={el}
                      className="form-checkbox h-5 w-5 text-main border-gray-300 rounded focus:ring-main"
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Loại input (giá) */}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`Giá cao nhất: ${Number(
                  bestprice
                ).toLocaleString()} VNĐ`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Đặt lại
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                {/* Input giá từ */}
                <div className="flex items-center gap-2">
                  <label htmlFor="from">Từ</label>
                  <input
                    className="form-input w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-main focus:outline-none transition"
                    type="text"
                    id="from"
                    value={new Intl.NumberFormat().format(Number(price.from) || "")}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/,/g, "");
                      if (!isNaN(numericValue)) {
                        setPrice((prev) => ({
                          ...prev,
                          from: numericValue,
                        }));
                      }
                    }}
                    style={{ width: adjustInputWidth(price.from) }}
                  />
                </div>
                {/* Input giá đến */}
                <div className="flex items-center gap-2">
                  <label htmlFor="to">Đến</label>
                  <input
                    className="form-input w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-main focus:outline-none transition"
                    type="text"
                    id="to"
                    value={new Intl.NumberFormat().format(Number(price.to) || "")}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/,/g, "");
                      if (!isNaN(numericValue)) {
                        setPrice((prev) => ({
                          ...prev,
                          to: numericValue,
                        }));
                      }
                    }}
                    style={{ width: adjustInputWidth(price.to) }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
