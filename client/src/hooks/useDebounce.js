import { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, ms);
    return () => {
      clearInterval(setTimeoutId);
    };
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;

/**
 * muốn: khi mà nhập thay đổi giá thì sẽ gọi api
 * Vấn đề: khi onChange thì input thay đổi liên tục -> gọi api liên tục theo mỗi lượt nhập
 * resolve: chỉ call api khi mà người dùng nhập xong
 * Thời gian onChange
 * ///////////////////////////////////////////////////////////////////////////////////////////////////
 * Tách value(price) thành 2 biến
 * 1. biến thứ 1 để phục vụ UI, gõ tới đâu thì lưu tới đo => UI render
 * 2. biến thứ 2 dùng để quyết định call api => setTimeout => biến sẽ được gán theo 1 khoảng thời gian
 */
