const { User } = require('../models'); // điều chỉnh đường dẫn theo cấu trúc của bạn
const bcrypt = require('bcryptjs');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        
        try {
            // Kiểm tra nếu email tồn tại
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ errCode: 1, message: 'Email không tồn tại' });
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ errCode: 1, message: 'Mật khẩu không chính xác' });
            }

            // Trả về thông tin người dùng (bao gồm roleId)
            return res.status(200).json({
                errCode: 0,
                message: 'Đăng nhập thành công',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roleId: user.roleId,
                }
            });
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return res.status(500).json({ errCode: -1, message: 'Lỗi server' });
        }
    }
};

module.exports = authController;
