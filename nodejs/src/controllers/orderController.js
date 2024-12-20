const { Order, Product } = require('../models'); // Import các model

const OrderController = {
    /**
     * Tạo một đơn hàng mới
     * @param {Object} req - Yêu cầu HTTP
     * @param {Object} res - Đáp ứng HTTP
     */
    async createOrder(req, res) {
        const { name, email, phone, address, cart } = req.body;

        try {
            // Kiểm tra dữ liệu đầu vào
            if (!name || !email || !phone || !address || !cart || cart.length === 0) {
                return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin đơn hàng.' });
            }

            // Tính tổng giá trị đơn hàng
            const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

            // Tạo đơn hàng mới
            const newOrder = await Order.create({
                name,
                email,
                phone,
                address,
                totalAmount,
            });

            // Lưu thông tin sản phẩm trong giỏ hàng vào bảng trung gian
            await Promise.all(cart.map(async (item) => {
                const product = await Product.findByPk(item.productId);
                if (product) {
                    await OrderProduct.create({
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                    });
                }
            }));

            return res.status(201).json({
                message: 'Đơn hàng đã được tạo thành công!',
                order: newOrder,
            });
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi tạo đơn hàng.', error: error.message });
        }
    },

    /**
     * Lấy danh sách tất cả đơn hàng
     * @param {Object} req - Yêu cầu HTTP
     * @param {Object} res - Đáp ứng HTTP
     */
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [{
                    model: Product,
                    as: 'products',
                    through: { attributes: ['quantity'] },
                }]
            });
            return res.status(200).json({ orders });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đơn hàng.', error: error.message });
        }
    },

    /**
     * Lấy thông tin chi tiết một đơn hàng
     * @param {Object} req - Yêu cầu HTTP
     * @param {Object} res - Đáp ứng HTTP
     */
    async getOrderById(req, res) {
        const { id } = req.params;
    
        try {
            const order = await Order.findByPk(id, {
                include: [{
                    model: Product,
                    as: 'products',
                    through: { attributes: ['quantity'] },
                }],
            });
    
            if (!order) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
            }
    
            return res.status(200).json({ order });
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi lấy chi tiết đơn hàng.', error: error.message });
        }
    },
    
    /**
     * Cập nhật thông tin đơn hàng
     * @param {Object} req - Yêu cầu HTTP
     * @param {Object} res - Đáp ứng HTTP
     */
    async updateOrder(req, res) {
        const { id } = req.params;
        const { name, email, phone, address, cart } = req.body;

        try {
            const order = await Order.findByPk(id);

            if (!order) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
            }

            // Cập nhật đơn hàng
            await order.update({ name, email, phone, address });

            // Xóa sản phẩm cũ trong đơn hàng và thêm sản phẩm mới (nếu có)
            await order.setProducts([]);

            // Thêm lại các sản phẩm trong giỏ hàng
            await Promise.all(cart.map(async (item) => {
                const product = await Product.findByPk(item.productId);
                if (product) {
                    await order.addProduct(product, {
                        through: { quantity: item.quantity },
                    });
                }
            }));

            return res.status(200).json({
                message: 'Cập nhật đơn hàng thành công!',
                order,
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật đơn hàng:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật đơn hàng.', error: error.message });
        }
    },

    /**
     * Xóa một đơn hàng
     * @param {Object} req - Yêu cầu HTTP
     * @param {Object} res - Đáp ứng HTTP
     */
    async deleteOrder(req, res) {
        const { id } = req.params;

        try {
            const order = await Order.findByPk(id);

            if (!order) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
            }

            // Xóa đơn hàng
            await order.destroy();

            return res.status(200).json({ message: 'Xóa đơn hàng thành công!' });
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa đơn hàng.', error: error.message });
        }
    },
    async updatePaymentStatus(req, res) {
        const { orderId, status } = req.body;
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
            }
            order.paymentStatus = status; // Cập nhật trạng thái thanh toán
            await order.save();
            return res.status(200).json({ message: 'Cập nhật trạng thái thanh toán thành công!' });
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật trạng thái thanh toán.', error: error.message });
        }
    },
    async getOrdersByUser(req, res) {
        const { userId } = req.params;
        try {
            const orders = await Order.findAll({
                where: { userId }, // Lọc theo userId
                include: [
                    {
                        model: Product,
                        as: 'products',
                        through: { attributes: ['quantity'] }
                    }
                ]
            });
            return res.status(200).json({ orders });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đơn hàng.', error: error.message });
        }
    },
};

module.exports = OrderController;
