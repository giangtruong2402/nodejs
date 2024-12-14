import React, { useState } from "react";
import { Button } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import Swal from "sweetalert2";
import path from "../../ultils/path";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Lỗi", "Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    setLoading(true);
    const response = await apiResetPassword({ password, token });
    setLoading(false);

    if (response.success) {
      Swal.fire(
        "Thành công",
        "Mật khẩu đã được đặt lại. Vui lòng đăng nhập bằng mật khẩu mới.",
        "success"
      ).then(() => {
        navigate(`/${path.LOGIN}`); // Chuyển hướng về trang login
      });
    } else {
      Swal.fire("Lỗi", response.mes || "Đặt lại mật khẩu thất bại!", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Đặt lại mật khẩu</h2>
        <label htmlFor="password" className="font-medium">
          Nhập mật khẩu mới:
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-300 placeholder:text-sm"
          placeholder="Nhập mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword" className="font-medium mt-4">
          Nhập lại mật khẩu mới:
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-300 placeholder:text-sm"
          placeholder="Nhập lại mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex items-center justify-end mt-4 gap-4">
          <Button
            name={loading ? "Đang xử lý..." : "Xác nhận"}
            handleOnclick={handleResetPassword}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              color: "white",
              backgroundColor: "#3b82f6",
              fontWeight: "600",
              transition: "transform 0.3s ease",
              "&:active": { transform: "scale(0.95)" },
            }}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
