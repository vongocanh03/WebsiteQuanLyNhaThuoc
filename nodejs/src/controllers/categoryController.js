// controllers/categoryController.js
import CRUDServiceCategory from '../services/CRUDServiceCategory';

let handleGetAllCategories = async (req, res) => {
    try {
        let categories = await CRUDServiceCategory.getAllCategories();
        return res.status(200).json({
            message: 'Categories retrieved successfully',
            categories: categories
        });
    } catch (error) {
        console.log('Error getting categories:', error);
        return res.status(500).json({ message: 'Error getting categories', error: error.message });
    }
};

let handleCreateCategory = async (req, res) => {
    try {
        let categoryData = req.body;

        if (!categoryData.name || categoryData.name.trim() === '') {
            // Render lại form với thông báo lỗi
            return res.render('category/createCategory', { message: 'Tên danh mục là bắt buộc' });
        }

        // Gọi service để tạo danh mục mới
        let createdCategory = await CRUDServiceCategory.createNewCategory(categoryData);

        // Redirect về danh sách danh mục sau khi thành công
        return res.redirect('/category');
    } catch (error) {
        console.log('Error creating category:', error);
        return res.render('category/createCategory', { message: 'Đã xảy ra lỗi khi tạo danh mục' });
    }
};


let handleUpdateCategory = async (req, res) => {
    try {
        let categoryData = req.body;
        if (!categoryData.id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        let updatedCategory = await CRUDServiceCategory.updateCategory(categoryData);
        return res.redirect('/category'); // Điều hướng về trang danh sách danh mục
    } catch (error) {
        console.log('Error updating category:', error);
        return res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

let handleDeleteCategory = async (req, res) => {
    try {
        let categoryId = req.body.id;
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        let deleted = await CRUDServiceCategory.deleteCategoryById(categoryId);
        if (deleted) {
            return res.redirect('/category'); // Điều hướng về trang danh sách danh mục
        } else {
            return res.status(400).json({ message: 'Unable to delete category' });
        }
    } catch (error) {
        console.log('Error deleting category:', error);
        return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

// controllers/categoryController.js

let handleGetAllCategoriesPage = async (req, res) => {
    try {
        let categories = await CRUDServiceCategory.getAllCategories();
        return res.render('category/displayCategories', {
            categories: categories
        });
    } catch (error) {
        console.log('Error fetching categories:', error);
        return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};


let getEditCategoryPage = async (req, res) => {
    try {
        let categoryId = req.query.id;
        let category = await CRUDServiceCategory.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.render('category/editCategory', { category: category });
    } catch (error) {
        console.log('Error fetching category for edit:', error);
        return res.status(500).json({ message: 'Error fetching category for edit', error: error.message });
    }
};


let createCategoryPage = (req, res) => {
    return res.render('category/createCategory'); // Hiển thị trang tạo danh mục
};


export default {
    handleGetAllCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleGetAllCategoriesPage,
    getEditCategoryPage,
    createCategoryPage
};
