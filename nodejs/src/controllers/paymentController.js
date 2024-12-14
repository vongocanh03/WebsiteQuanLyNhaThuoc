// controllers/paymentController.js
const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const { userId, cartId, totalAmount, orderInfo, status } = req.body;

    const payment = await Payment.create({
      userId,
      cartId,
      totalAmount,
      orderInfo,
      status,
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
};

exports.getPaymentStatistics = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: ['User', 'Cart'], // Liên kết với bảng Users và Carts
      order: [['paymentDate', 'DESC']], // Sắp xếp theo ngày thanh toán
    });

    res.status(200).json({ payments });
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
};
