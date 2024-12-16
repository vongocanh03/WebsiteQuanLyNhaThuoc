// controllers/symptomController.js
const { Product, Symptom, Productsymptom } = require('../models');
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
const createSymptom = async (req, res) => {
  const { name, productIds } = req.body;

  try {
      const symptom = await Symptom.create({ name });

      if (productIds && productIds.length > 0) {
          await symptom.setProducts(productIds);
      }

      res.status(201).json(symptom);
  } catch (error) {
      console.error('Error creating symptom:', error);
      res.status(500).json({ message: 'Lỗi khi tạo triệu chứng' });
  }
};

const updateSymptom = async (req, res) => {
  const { id } = req.params;
  const { name, productIds } = req.body;

  try {
      const symptom = await Symptom.findByPk(id);
      if (!symptom) {
          return res.status(404).json({ message: 'Không tìm thấy triệu chứng' });
      }

      symptom.name = name;
      await symptom.save();

      if (productIds && productIds.length > 0) {
          await symptom.setProducts(productIds);
      }

      res.json(symptom);
  } catch (error) {
      console.error('Error updating symptom:', error);
      res.status(500).json({ message: 'Lỗi khi cập nhật triệu chứng' });
  }
};

const deleteSymptom = async (req, res) => {
  const { id } = req.params;

  try {
      const symptom = await Symptom.findByPk(id);
      if (!symptom) {
          return res.status(404).json({ message: 'Không tìm thấy triệu chứng' });
      }

      await symptom.destroy();
      res.json({ message: 'Xóa triệu chứng thành công' });
  } catch (error) {
      console.error('Error deleting symptom:', error);
      res.status(500).json({ message: 'Lỗi khi xóa triệu chứng' });
  }
};

const listSymptoms = async (req, res) => {
  try {
      const symptoms = await Symptom.findAll({
          include: {
              model: Product,
              as: 'products',
              attributes: ['id', 'name'],
          },
      });
      res.json(symptoms);
  } catch (error) {
      console.error('Error fetching symptoms:', error);
      res.status(500).json({ message: 'Lỗi khi lấy danh sách triệu chứng' });
  }
};
module.exports = { suggestProducts, createSymptom, updateSymptom, deleteSymptom, listSymptoms };
