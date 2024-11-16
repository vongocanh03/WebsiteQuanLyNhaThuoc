import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import productController from '../controllers/productController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.get('/categories/create', categoryController.createCategoryPage); // Trang tạo category
    router.post('/post-create', categoryController.handleCreateCategory); // Tạo category (dùng chung với API)
    router.get('/categories/edit', categoryController.getEditCategoryPage); // Trang chỉnh sửa category
    router.post('/categories/update', categoryController.handleUpdateCategory); // Cập nhật category (dùng chung với API)
    router.post('/categories/delete', categoryController.handleDeleteCategory); // Xóa category (dùng chung với API)
    router.get('/get-allcategories', categoryController.handleGetAllCategoriesPage); // Hiển thị tất cả category

    // API routes
    router.get('/api/products', productController.handleGetAllProducts); // Lấy tất cả sản phẩm (JSON cho frontend)
    router.post('/api/products', productController.handleCreateProduct); // Tạo sản phẩm mới
    router.put('/api/products', productController.handleUpdateProduct);  // Cập nhật sản phẩm
    router.delete('/api/products', productController.handleDeleteProduct); // Xóa sản phẩm

    // Web routes
    router.get('/get-allproducts', productController.handleGetAllProductsPage); // Hiển thị trang tất cả sản phẩm
    router.get('/create-product', productController.handleCreateProductPage); // Hiển thị trang tạo sản phẩm
    router.get('/edit-product', productController.handleGetEditProductPage); // Hiển thị trang chỉnh sửa sản phẩm

    router.post('/  ', userController.handleLogin);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/get-categories', categoryController.handleGetAllCategories);
    router.post('/api/create-category', categoryController.handleCreateCategory);
    router.put('/api/update-category', categoryController.handleUpdateCategory);
    router.delete('/api/delete-category', categoryController.handleDeleteCategory);

    return app.use("/", router);
};

module.exports = initWebRoutes;
