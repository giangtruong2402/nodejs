import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isForgotPasswordl, setisForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const validateInputs = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const mobileRegex = /^0\d{9}$/;
  
    if (!emailRegex.test(payload.email)) {
      Swal.fire(
        "Lỗi",
        "Email phải đúng định dạng và kết thúc bằng @gmail.com!",
        "error"
      );
      return false;
    }
  
    if (!mobileRegex.test(payload.mobile)) {
      Swal.fire(
        "Lỗi",
        "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0!",
        "error"
      );
      return false;
    }
  
    return true;
  }, [payload.email, payload.mobile]);
  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire("Lỗi", "Vui lòng nhập email trước khi gửi!", "error");
      return;
    }

    setLoading(true);
    const response = await apiForgotPassword({ email });
    setLoading(false);

    if (response.success) {
      Swal.fire(
        "Thành công",
        "Email đã được gửi, vui lòng kiểm tra hộp thư!",
        "success"
      );
    } else {
      Swal.fire("Lỗi", "Email không tồn tại hoặc không chính xác!", "error");
    }
  };

  const handleSubmit = useCallback(async () => {
    if (isRegister) {
      if (payload.password !== payload.confirmPassword) {
        Swal.fire("Lỗi", "Mật khẩu không khớp!", "error");
        return;
      }

      if (!validateInputs()) return;

      setLoading(true);
      const { confirmPassword, ...registerPayload } = payload;
      const response = await apiRegister(registerPayload);
      setLoading(false);
      if (response.success) {
        Swal.fire("Chúc mừng", response.mes, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Thất bại", response.mes, "error");
      }
    } else {
      setLoading(true);
      const { firstname, lastname, mobile, confirmPassword, ...loginPayload } =
        payload;
      const response = await apiLogin(loginPayload);
      setLoading(false);
      if (response.success) {
        dispatch(
          login({
            isLoggedIn: true,
            token: response.accessToken,
            userData: response.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Thất bại", response.mes, "error");
      }
    }
  }, [payload, isRegister, dispatch, navigate, validateInputs]);

  return (
    <div className="w-screen h-screen relative">
      {isForgotPasswordl && (
        <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-[600px]">
            <h2 className="text-xl font-bold text-center mb-4">
              Khôi phục mật khẩu
            </h2>
            <label htmlFor="email" className="font-medium">
              Nhập email của bạn:
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-300 placeholder:text-sm"
              placeholder="Email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end mt-4 gap-4 w-full">
              <Button
                name={loading ? "Đang gửi..." : "Gửi"}
                handleOnclick={handleForgotPassword}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "white",
                  backgroundColor: "#3b82f6", // Tailwind bg-blue-500
                  fontWeight: "600",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                  transform: "scale(0.95)",
                  transition: "transform 0.2s",
                }}
                disabled={loading}
              />

              <Button
                name="Quay lại"
                handleOnclick={() => {
                  setisForgotPassword(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "#4b5563", // Tailwind text-gray-700
                  backgroundColor: "#d1d5db", // Tailwind bg-gray-300
                  fontWeight: "600",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                  transform: "scale(0.95)",
                  transition: "transform 0.2s",
                }}
              />
            </div>
          </div>
        </div>
      )}
      <img
        src="http://ngn-mag.com/image/wallpaper/fond-ecran-noel%20(238).jpg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Đăng Ký" : "Đăng nhập"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                namekey="firstname"
placeholder={"Tên"}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                namekey="lastname"
placeholder={"Họ"}
              />
            </div>
          )}
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              namekey="mobile"
              placeholder={"Số điên thoại"}
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            namekey="email"
            placeholder={"email"}
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            namekey="password"
            type="password"
            placeholder={"Mật khẩu"}
          />
          {isRegister && (
            <InputField
              value={payload.confirmPassword}
              setValue={setPayload}
              namekey="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
          )}
          <Button
            name={loading ? "..." : isRegister ? "Đăng Ký" : "Đăng nhập"}
            handleOnclick={handleSubmit}
            fw
            disabled={loading}
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                onClick={() => {
                  setisForgotPassword(true);
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Quên mật khẩu?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                Đăng ký
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => {
                  setIsRegister(false);
                }}
              >
                Đăng Nhập
              </span>
            )}
          </div>
          <Link
            className="text-blue-500 hover:underline cursor-pointer text-sm"
            to={`/${path.HOME}`}
          >
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
