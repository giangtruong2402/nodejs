const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Kiểm tra xem có thiếu dữ liệu hoặc dữ liệu là chuỗi rỗng
    if (!email || !password || !firstname || !lastname || 
        email.trim() === "" || password.trim() === "" || 
        firstname.trim() === "" || lastname.trim() === "") {
        return res.status(400).json({
            success: false,
            message: 'Missing or invalid input'
        });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });
    }

    // Nếu tất cả hợp lệ, tiến hành tạo user
    const response = await User.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        response
    });
});

module.exports = {
    register
};
