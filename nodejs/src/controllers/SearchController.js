const { Op } = require('sequelize');
const { Product, Category } = require('../models');

const searchController = {
    search: async (req, res) => {
        const query = req.query.query; // Lấy từ khóa tìm kiếm từ query params
        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'Từ khóa tìm kiếm không được để trống' });
        }

        try {
            // Tìm kiếm trong bảng sản phẩm
            const products = await Product.findAll({
                where: {
                    name: { [Op.like]: `%${query}%` }, // Tìm kiếm tên có chứa từ khóa
                },
                attributes: ['id', 'name', 'description'], // Chỉ lấy các trường cần thiết
            });

            // Tìm kiếm trong bảng thể loại
            const categories = await Category.findAll({
                where: {
                    name: { [Op.like]: `%${query}%` },
                },
                attributes: ['id', 'name', 'description'], // Chỉ lấy các trường cần thiết
            });

            // Định dạng kết quả để thêm trường `type`
            const formattedProducts = products.map((product) => ({
                ...product.toJSON(),
                type: 'product',
            }));
            const formattedCategories = categories.map((category) => ({
                ...category.toJSON(),
                type: 'category',
            }));

            // Kết hợp sản phẩm và thể loại
            const results = [...formattedProducts, ...formattedCategories];

            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thực hiện tìm kiếm' });
        }
    },
};

module.exports = searchController;
