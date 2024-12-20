// controllers/productsymptomController.js
const { Productsymptom } = require('../models');

const createProductsymptom = async (req, res) => {
    const { symptomId, productIds } = req.body;

    try {
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
