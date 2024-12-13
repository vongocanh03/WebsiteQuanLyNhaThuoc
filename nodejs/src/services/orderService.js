// services/orderService.js
const { Order } = require('../models'); // Import model Order

const createOrder = async (orderData) => {
    try {
        const newOrder = await Order.create(orderData);
        return newOrder;
    } catch (error) {
        console.error('Error saving order:', error);
        throw new Error('Không thể lưu đơn hàng');
    }
};

module.exports = { createOrder };
