const { createPaymentRequest } = require('../services/momoService');

const momoPayment = async (req, res) => {
    const { amount, orderInfo } = req.body;

    try {
        const response = await createPaymentRequest(amount, orderInfo);
        res.json(response);
    } catch (error) {
        console.error('Error during MoMo payment request:', error);
        res.status(500).json({ message: 'Payment request failed', error });
    }
};

module.exports = {
    momoPayment,
};
