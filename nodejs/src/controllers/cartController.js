// controllers/cartController.js
const { Cart, CartItem } = require('../models');

// Lưu giỏ hàng vào cơ sở dữ liệu
exports.saveCart = async (req, res) => {
    const { userId, cartItems } = req.body;

    try {
        // Tạo giỏ hàng
        const cart = await Cart.create({ userId });

        // Thêm các sản phẩm vào giỏ hàng
        const items = cartItems.map((item) => ({
            cartId: cart.id,
            productId: item.productId,
            name: item.name,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
        }));
        await CartItem.bulkCreate(items);

        res.status(201).json({ message: 'Giỏ hàng đã được lưu', cartId: cart.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lưu giỏ hàng' });
    }
};

// Lấy giỏ hàng theo userId
exports.getCartByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({
            where: { userId },
            include: { model: CartItem, as: 'items' },
        });

        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng' });
    }
};
