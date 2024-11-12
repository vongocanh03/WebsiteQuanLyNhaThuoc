// services/CRUDServiceProduct.js
import { Product, Category } from '../models';

let getAllProducts = async () => {
    return await Product.findAll({
        include: [{ model: Category, as: 'category', attributes: ['name'] }]
    });
};

let createNewProduct = async (productData) => {
    return await Product.create(productData);
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
