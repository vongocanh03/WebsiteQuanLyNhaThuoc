// controllers/productsymptomController.js
const { Productsymptom, Product, Symptom } = require('../models');

const createProductsymptom = async (req, res) => {
    const { symptomId, productIds } = req.body;

    // Kiểm tra nếu symptomId hoặc productIds không hợp lệ
    if (!symptomId || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Kiểm tra nếu symptomId và các productId có tồn tại trong cơ sở dữ liệu không
        const symptomExists = await Symptom.findByPk(symptomId);
        if (!symptomExists) {
            return res.status(404).json({ message: 'Triệu chứng không tồn tại' });
        }

        const productsExist = await Product.findAll({
            where: {
                id: productIds,
            },
        });
        if (productsExist.length !== productIds.length) {
            return res.status(404).json({ message: 'Một hoặc nhiều thuốc không tồn tại' });
        }

        // Tạo mối quan hệ triệu chứng và thuốc
        const productsymptomPromises = productIds.map((productId) =>
            Productsymptom.create({ symptomId, productId })
        );
        
        await Promise.all(productsymptomPromises);
        res.status(201).json({ message: 'Mối quan hệ triệu chứng và thuốc đã được tạo' });
    } catch (error) {
        console.error('Error creating productsymptom:', error);
        res.status(500).json({ message: 'Lỗi khi tạo mối quan hệ triệu chứng và thuốc' });
    }
};

module.exports = { createProductsymptom };
