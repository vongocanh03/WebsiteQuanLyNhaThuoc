// controllers/symptomController.js
const { Product, Symptom } = require('../models');
const { Op } = require('sequelize'); // Đảm bảo rằng bạn sử dụng cách này để import Op

const suggestProducts = async (req, res) => {
  const { symptoms } = req.body; // Mảng triệu chứng từ client
  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ message: 'Vui lòng nhập ít nhất một triệu chứng' });
  }

  try {
    const products = await Product.findAll({
      include: [
        {
          model: Symptom,
          as: 'symptoms',
          where: {   name: { [Op.in]: symptoms } },
        },
      ],
    });
    console.log('Suggested products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error suggesting products:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = { suggestProducts };
