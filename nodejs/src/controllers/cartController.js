// src/controllers/cartController.js
const cartService = require('../services/cartService');

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    try {
        const cartItem = await cartService.addToCart(userId, productId, quantity);
        res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const cartItems = await cartService.getCartByUserId(userId);
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;
    
    try {
        const response = await cartService.removeFromCart(userId, productId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateQuantityInCart = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;  // Đảm bảo số lượng được truyền trong body

    try {
        const cartItem = await cartService.getCartItem(userId, productId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Sản phẩm không có trong giỏ hàng' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Số lượng sản phẩm đã được cập nhật', cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCartItem = async (userId, productId) => {
    try {
        return await Cart.findOne({ where: { userId, productId } });
    } catch (error) {
        throw new Error('Lỗi khi tìm sản phẩm trong giỏ hàng');
    }
};

