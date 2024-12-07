// src/services/cartService.js
const { Cart } = require('../models');
const { Product } = require('../models');

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (userId, productId, quantity) => {
    try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const [cartItem, created] = await Cart.findOrCreate({
            where: { userId, productId },
            defaults: { quantity },
        });

        if (!created) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
            cartItem.quantity += quantity;
            await cartItem.save();
        }
        return cartItem;
    } catch (error) {
        throw new Error('Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
};

// Lấy giỏ hàng của người dùng
exports.getCartByUserId = async (userId) => {
    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product, attributes: ['name', 'price', 'image'] }],
        });
        return cartItems;
    } catch (error) {
        throw new Error('Lỗi khi lấy giỏ hàng');
    }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (userId, productId) => {
    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });
        if (!cartItem) {
            throw new Error('Sản phẩm không tồn tại trong giỏ hàng');
        }

        await cartItem.destroy();
        return { message: 'Sản phẩm đã được xóa khỏi giỏ hàng' };
    } catch (error) {
        throw new Error('Lỗi khi xóa sản phẩm khỏi giỏ hàng');
    }
};
