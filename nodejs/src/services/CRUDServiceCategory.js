import db from '../models/index';

// Thêm thể loại mới
const createNewCategory = async (categoryData) => {
    try {
        // Kiểm tra xem thể loại đã tồn tại chưa
        const existingCategory = await db.Category.findOne({
            where: { name: categoryData.name },
        });
        if (existingCategory) {
            throw new Error('Category already exists');
        }
        // Tạo thể loại mới
        const newCategory = await db.Category.create({
            name: categoryData.name,
        });
        return newCategory;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Lấy tất cả thể loại
const getAllCategories = async () => {
    try {
        const categories = await db.Category.findAll();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Lấy thể loại theo ID
const getCategoryById = async (categoryId) => {
    try {
        const category = await db.Category.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
};

// Cập nhật thể loại
const updateCategory = async (categoryData) => {
    try {
        const category = await db.Category.findByPk(categoryData.id);
        if (!category) {
            throw new Error('Category not found');
        }
        category.name = categoryData.name; // Cập nhật tên thể loại
        await category.save();
        return category;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Xóa thể loại
const deleteCategoryById = async (categoryId) => {
    try {
        const category = await db.Category.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        await category.destroy();
        return true;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
// Lấy thể loại theo tên
const getCategoryByName = async (name) => {
    try {
        const category = await db.Category.findOne({
            where: { name: name }
        });
        return category;
    } catch (error) {
        console.error('Error fetching category by name:', error);
        throw error;
    }
};
export default {
    createNewCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategoryById,
    getCategoryByName,
};
