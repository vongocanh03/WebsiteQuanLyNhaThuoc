// services/CRUDServiceProduct.js
import { Product, Category } from '../models';

let getAllProducts = async () => {
    return await Product.findAll({
        include: [{ model: Category, as: 'category', attributes: ['name'] }]
    });
};

let createNewProduct = async (productData) => {
    try {
        // Log dữ liệu trước khi lưu vào cơ sở dữ liệu
        console.log("Data being inserted:", productData);

        // Sử dụng Sequelize để tạo sản phẩm
        const createdProduct = await Product.create(productData);

        // Log sản phẩm đã được tạo thành công
        console.log("Created product:", createdProduct);
        return createdProduct;
    } catch (error) {
        // Log chi tiết lỗi nếu có
        console.error("Error in createNewProduct:", error.message, error.stack);

        // Kiểm tra nếu lỗi là liên quan đến ràng buộc của Sequelize
        if (error.name === 'SequelizeValidationError') {
            console.error("Validation error details:", error.errors);
        }

        // Ném lỗi để controller xử lý
        throw error;
    }
   // return await Product.create(productData);
};

let getProductById = async (productId) => {
    return await Product.findByPk(productId, {
        include: [{ model: Category, as: 'category', attributes: ['name'] }]
    });
};

let updateProduct = async (productData) => {
    let product = await Product.findByPk(productData.id);
    if (product) {
        return await product.update(productData);
    }
    return null;
};

let deleteProductById = async (productId) => {
    let product = await Product.findByPk(productId);
    if (product) {
        await product.destroy();
        return true;
    }
    return false;
};

let getAllCategories = async () => {
    return await Category.findAll();
};


module.exports = {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProduct,
    deleteProductById,
    getAllCategories
};
