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

        // Xử lý loại bỏ khoảng trắng thừa
        categoryData.name = categoryData.name.trim();

        // Kiểm tra xem tên thể loại có tồn tại trong cơ sở dữ liệu không
        let existingCategory = await CRUDServiceCategory.getCategoryByName(categoryData.name);
        if (existingCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        let createdCategory = await CRUDServiceCategory.createNewCategory(categoryData);
        return res.status(201).json({
            message: 'Category created successfully',
            category: createdCategory
        });
    } catch (error) {
        console.log('Error creating category:', error);
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
        return res.render('category/displayCategories', {
            categories: categories
        });
    } catch (error) {
        console.log('Error fetching categories for page:', error);
        return res.status(500).json({ message: 'Error fetching categories for page', error: error.message });
    }
};

let getEditCategoryPage = async (req, res) => {
    try {
        const categoryId = req.params.id; // Lấy ID từ URL
        
        // Lấy thể loại theo ID
        const category = await CRUDServiceCategory.getCategoryById(categoryId);
        
        // Truyền dữ liệu thể loại vào view
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.render('category/editCategory', {
            category: category
        });
    } catch (error) {
        console.log('Error fetching category for edit:', error);
        return res.status(500).json({ message: 'Error fetching category for edit', error: error.message });
    }
};


let createCategoryPage = (req, res) => {
    return res.render('category/createCategory');
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
