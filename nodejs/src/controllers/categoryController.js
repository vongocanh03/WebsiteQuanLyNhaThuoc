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
        
        // Kiểm tra xem tên thể loại đã tồn tại chưa
        if (!categoryData.name || categoryData.name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }

        let createdCategory = await CRUDServiceCategory.createNewCategory(categoryData);
        return res.status(201).json({
            message: 'Category created successfully',
            category: createdCategory
        });
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

        // Kiểm tra đầu vào
        if (!categoryData.id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        let updatedCategory = await CRUDServiceCategory.updateCategory(categoryData);
        return res.status(200).json({
            message: 'Category updated successfully',
            category: updatedCategory
        });
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
            return res.status(200).json({
                message: 'Category deleted successfully'
            });
        } else {
            return res.status(400).json({ message: 'Unable to delete category' });
        }
    } catch (error) {
        console.log('Error deleting category:', error);
        return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

let handleGetAllCategoriesPage = async (req, res) => {
    try {
        let categories = await CRUDServiceCategory.getAllCategories();
        return res.render('categories/allCategories', {
            categories: categories
        });
    } catch (error) {
        console.log('Error fetching categories for page:', error);
        return res.status(500).json({ message: 'Error fetching categories for page', error: error.message });
    }
};

let getEditCategoryPage = (req, res) => {
    return res.render('categories/editCategory');
};

let createCategoryPage = (req, res) => {
    return res.render('categories/createCategory');
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
