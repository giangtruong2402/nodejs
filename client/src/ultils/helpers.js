import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;

export const creatSlug = (string) => {
  if (!string || typeof string !== "string") return ""; // Xử lý chuỗi không hợp lệ
  return string
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu thanh
    .replace(/đ/g, "d") // Chuyển đ thành d
    .replace(/Đ/g, "D") // Chuyển Đ thành D
    .replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt, giữ lại chữ và số
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .toLowerCase(); // Chuyển tất cả thành chữ thường
};

export const formatMoney = (number) => {
  if (isNaN(Number(number))) return "0"; // Giá trị mặc định
  return Number(number?.toFixed(1)).toLocaleString();
};
export const formatDiscountedMoney = (number) => {
  if (isNaN(Number(number))) return "0"; // Giá trị mặc định
  const discountedPrice = number * 0.8; // Giảm 20%
  return Number(discountedPrice.toFixed(1)).toLocaleString();
};

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar key={i} color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar key={i} color="orange" size={size || 16} />);
  }
  return stars;
};
export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let i of formatPayload) {
    if (i[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: i[0], mes: "Trường này không được để trống~" },
      ]);
    }
  }
  for (let i of formatPayload) {
    switch (i[0]) {
      case "email":
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!i[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Email không hợp lệ~" },
          ]);
        }
        break;
      case "password":
        if (i[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Mật khẩu tối thiểu 6 ký tự~" },
          ]);
        }
        break;
      case "phone":
        if (!+i[1]) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Số điện thoại phải là số~" },
          ]);
        }
        if (+i[1] < 0) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Số điện thoại không là số âm~" },
          ]);
        }
        if (+i[1].length !== 10) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Điện thoại phải có 10 số~" },
          ]);
        }
        break;
    }
  }

  return invalids;
};
