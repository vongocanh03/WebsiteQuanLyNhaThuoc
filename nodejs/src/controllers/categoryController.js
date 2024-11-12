
import CRUDServiceCategory from '../services/CRUDServiceCategory';

let getAllCategoriesPage = async (req, res) => {
    try {
        let categories = await CRUDServiceCategory.getAllCategories();
        return res.render('category/displayCategories.ejs', {
            categories: categories
        });
    } catch (error) {
        console.log('Error getting categories:', error);
        return res.send('Error getting categories');
    }
}

let createCategoryPage = (req, res) => {
    return res.render('category/createCategory.ejs');
}

let createCategory = async (req, res) => {
    try {
        let categoryData = req.body;
        let createdCategory = await CRUDServiceCategory.createNewCategory(categoryData);
        if (createdCategory) {
            return res.redirect('/get-allcategories');
        } else {
            return res.send('Error creating category');
        }
    } catch (error) {
        console.log('Error creating category:', error);
        return res.send('Error creating category');
    }
}

let getEditCategoryPage = async (req, res) => {
    let categoryId = req.query.id;
    if (categoryId) {
        let category = await CRUDServiceCategory.getCategoryById(categoryId);
        if (category) {
            return res.render('category/editCategory.ejs', {
                category: category
            });
        } else {
            return res.send('Category not found');
        }
    } else {
        return res.send('Category not found');
    }
}

let updateCategory = async (req, res) => {
    let categoryData = req.body;
    try {
        let updatedCategory = await CRUDServiceCategory.updateCategory(categoryData);
        if (updatedCategory) {
            return res.redirect('/get-allcategories');
        } else {
            return res.send('Error updating category');
        }
    } catch (error) {
        console.log('Error updating category:', error);
        return res.send('Error updating category');
    }
}

let deleteCategory = async (req, res) => {
    let categoryId = req.body.id; // Lấy id từ body vì dùng phương thức POST
    if (categoryId) {
        try {
            let deleted = await CRUDServiceCategory.deleteCategoryById(categoryId);
            if (deleted) {
                return res.redirect('/get-allcategories'); // Chuyển hướng về trang hiển thị danh sách thể loại
            } else {
                return res.send('Không thể xóa thể loại');
            }
        } catch (error) {
            console.log('Lỗi khi xóa thể loại:', error);
            return res.send('Lỗi khi xóa thể loại');
        }
    } else {
        return res.send('Không tìm thấy thể loại');
    }
};

module.exports = {
    getAllCategoriesPage:getAllCategoriesPage,
    createCategoryPage:createCategoryPage,
    createCategory:createCategory,
    getEditCategoryPage:getEditCategoryPage,
    updateCategory:updateCategory,
    deleteCategory:deleteCategory
};
