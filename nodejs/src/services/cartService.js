// services/cartService.js
const { Cart, Product, User } = require('../models');

// Lấy tất cả các sản phẩm trong giỏ hàng của người dùng
const getAllCartItems = async (userId) => {
    const cartItems = await Cart.findAll({
        where: { userId },
        include: [
            { model: Product, as: 'product', attributes: ['name', 'price', 'image'] }
        ]
    });
    return cartItems;
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (userId, productId, quantity) => {
    const existingCartItem = await Cart.findOne({ where: { userId, productId } });

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        return existingCartItem;
    } else {
        const newCartItem = await Cart.create({ userId, productId, quantity });
        return newCartItem;
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItem = async (userId, productId, quantity) => {
    const cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
        return cartItem;
    }
    return null;
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (userId, productId) => {
    const cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
};

// Xóa tất cả sản phẩm trong giỏ hàng
const clearCart = async (userId) => {
    await Cart.destroy({ where: { userId } });
};

module.exports = {
    getAllCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
