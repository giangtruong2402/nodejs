const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const sendMail = require("../ultils/sendMail");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const {
  generateAccessToken,
  generateRefeshToken,
} = require("../middlewares/jwt");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  // Kiểm tra xem có thiếu dữ liệu hoặc dữ liệu là chuỗi rỗng
  if (
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    email.trim() === "" ||
    password.trim() === "" ||
    firstname.trim() === "" ||
    lastname.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid input",
    });
  }

  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User has existed!",
    });
  } else {
    const newuser = await User.create(req.body);
    return res.status(200).json({
      success: newuser ? true : false,
      mes: newuser
        ? "Register is successfully. please go login."
        : "something went wrong",
    });
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // tách password và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    //tạo access token
    const accessToken = generateAccessToken(response._id, role);
    // tạo refesh token
    const newrefreshToken = generateRefeshToken(response._id);

    // Lưu refesh token  vào database
    await User.findByIdAndUpdate(response._id, { refreshToken: newrefreshToken}, { new: true });

    // Lưu refesh token vào cookie
    res.cookie("refreshToken", newrefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials! ");
  }
});
const getCrurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select(
    "-password -passwordResetExpiress -passwordResetToken -passwordChangedAt -refreshToken"
  );

  return res.status(user ? 200 : 401).json({
    success: !!user,
    userData: user ? user : undefined,
    mes: !user ? "User not found" : undefined,
  });
});

const refeshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie && !cookie.refreshToken)
    throw new Error("No refreshToken in cookies");
  jwt.verify(
    cookie.refreshToken,
    process.env.JWT_SECRET,
    async (err, decode) => {
      if (err) throw new Error("Invalid resfresh token");
      const response = await User.findOne({
        _id: decode._id,
        refreshToken: cookie.refreshToken,
      });
      return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response
          ? generateAccessToken(response._id, response.role)
          : "refresh token not matched",
      });
    }
  );
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  //  xóa rèfresh token khỏi db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: null },
    { new: true }
  );
  // xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  return res.status(200).json({
    success: true,
    mes: "Đăng xuất thành công.",
  });
});

// client guiwr email
// server check email có hợp lệ hay khồn => Gửi email + kèm theo link (password change token)
// client check mail => click link
// client gửi api kèm token
// check token  có giống với token mà server gửi hay không
// change password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query
  if (!email) throw new Error("missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `xin vui lòng click vào link dưới đây để đổi mật khẩu. link này sẽ hết hạn sau 15p <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

  await sendMail(email, html);
  return res.status(200).json({
    success: true,
    mes: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.",
  });
});


const  resetPassword = asyncHandler(async (req, res) => {

  const {password,  token} = req.body
  if (!password || !token) throw new Error('missing inputs')
  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({passwordResetToken, passwordResetExpiress: {$gt: Date.now()}})
  if(!user) throw new Error('Invalid reset token')
  user.password = password
  user.passwordResetToken = undefined
  user. passwordChangedAt = Date.now()
  user. passwordResetExpiress = undefined

  await user.save()
  return res.status(200).json({
    success:user ? true : false,
    mes: user ?'updated password' : 'somthing went wrong'
  })
})

const getUsers = asyncHandler(async (req, res) => {

  const response = await User.find().select(
    "-password -role -refreshToken"
  );
  return res.status(200).json({
    success: response ?true : false,
    users: response
  })
  
})
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing input");
  const response = await User.findByIdAndDelete(_id);
  // if (response && response.avatar)
  //   cloudinary.uploader.destroy(response.fileNameAvatar);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? `User with email ${response.email} deleted.` : "No user delete",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(_id, req.body, {new : true}).select('-password -role');
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "something went wrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(uid, req.body, {new : true}).select('-password -role');
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "something went wrong",
  });
});

module.exports = {
  register,
  login,
  getCrurrent,
  refeshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
};
