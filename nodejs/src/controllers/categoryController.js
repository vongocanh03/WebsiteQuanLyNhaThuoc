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

        // Xử lý loại bỏ khoảng trắng thừa
        categoryData.name = categoryData.name.trim();

        // Kiểm tra xem tên thể loại có tồn tại trong cơ sở dữ liệu không
        let existingCategory = await CRUDServiceCategory.getCategoryByName(categoryData.name);
        if (existingCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        // Gọi service để tạo danh mục mới
        let createdCategory = await CRUDServiceCategory.createNewCategory(categoryData);

        // Redirect về danh sách danh mục sau khi thành công
        return res.redirect('/category');
    } catch (error) {
        console.log('Error creating category:', error);
        if (error.message === 'Category already exists') {
            return res.status(400).json({ message: 'Category already exists' });
        }
        return res.status(500).json({ message: 'Error creating category', error: error.message });
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


let getEditCategoryPage = (req, res) => {
    return res.render('categories/editCategory');
};

let createCategoryPage = (req, res) => {
    return res.render('categories/createCategory');
};


module.exports= {
    handleGetAllCategories:handleGetAllCategories,
    handleCreateCategory:handleCreateCategory,
    handleUpdateCategory:handleUpdateCategory,
    handleDeleteCategory:handleDeleteCategory,
    handleGetAllCategoriesPage:handleGetAllCategoriesPage,
    getEditCategoryPage:getEditCategoryPage,
    createCategoryPage:createCategoryPage,
};
