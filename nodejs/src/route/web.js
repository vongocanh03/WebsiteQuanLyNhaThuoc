import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import productController from '../controllers/productController';

let router = express.Router();

let initWebRoutes = (app) => {
    // Trang chủ và các trang cơ bản
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    // Route quản lý category (Web)
    router.get('/category', categoryController.handleGetAllCategoriesPage); // Trang danh sách danh mục
    router.get('/category/create', categoryController.createCategoryPage); // Trang tạo danh mục mới
    router.post('/category/create', categoryController.handleCreateCategory); // Xử lý tạo danh mục mới
    router.get('/category/edit', categoryController.getEditCategoryPage); // Trang chỉnh sửa danh mục
    router.post('/category/update', categoryController.handleUpdateCategory); // Xử lý cập nhật danh mục
    router.post('/category/delete', categoryController.handleDeleteCategory); // Xử lý xóa danh mục


    // Route quản lý sản phẩm (Web)
    router.get('/create-product', productController.handleCreateProductPage); // Hiển thị trang tạo sản phẩm
    router.post('/create-product', productController.handleCreateProduct); // Tạo sản phẩm
    router.get('/edit-product', productController.handleGetEditProductPage); // Trang chỉnh sửa sản phẩm
    router.post('/update-product', productController.handleUpdateProduct); // Cập nhật sản phẩm
    router.post('/delete-product', productController.handleDeleteProduct); // Xóa sản phẩm
    router.get('/get-allproducts', productController.handleGetAllProductsPage); // Hiển thị danh sách sản phẩm

    // Route API quản lý sản phẩm
    router.get('/api/products', productController.handleGetAllProducts); // Lấy tất cả sản phẩm (JSON cho frontend)
    router.post('/api/products', productController.handleCreateProduct); // Tạo sản phẩm mới
    router.put('/api/products', productController.handleUpdateProduct);  // Cập nhật sản phẩm
    router.delete('/api/products', productController.handleDeleteProduct); // Xóa sản phẩm

    // Route API quản lý người dùng
    router.post('/api/login', userController.handleLogin); // Đăng nhập API
    router.get('/api/get-all-users', userController.handleGetAllUsers); // Lấy tất cả người dùng
    router.post('/api/create-new-user', userController.handleCreateNewUser); // Tạo người dùng mới
    router.put('/api/edit-user', userController.handleEditUser); // Cập nhật thông tin người dùng
    router.delete('/api/delete-user', userController.handleDeleteUser); // Xóa người dùng

    // Route API quản lý category
    router.get('/api/get-categories', categoryController.handleGetAllCategories); // Lấy tất cả category
    router.post('/api/create-category', categoryController.handleCreateCategory); // Tạo category mới
    router.put('/api/update-category', categoryController.handleUpdateCategory); // Cập nhật category
    router.delete('/api/delete-category', categoryController.handleDeleteCategory); // Xóa category

    // Return router middleware
    return app.use("/", router);
};

module.exports = initWebRoutes;
