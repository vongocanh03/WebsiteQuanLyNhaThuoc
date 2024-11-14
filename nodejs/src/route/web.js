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

    router.get('/categories/create', categoryController.createCategoryPage);
    router.post('/post-create', categoryController.createCategory);
    router.get('/categories/edit', categoryController.getEditCategoryPage);
    router.post('/categories/update', categoryController.updateCategory);
    router.post('/categories/delete', categoryController.deleteCategory);
    router.get('/get-allcategories', categoryController.getAllCategoriesPage);

    // Routes cho sản phẩm
    router.get('/get-allproducts', productController.getAllProductsPage);
    router.get('/create-product', productController.createProductPage);
    router.post('/create-product', productController.createProduct);
    router.get('/edit-product', productController.getEditProductPage);
    router.post('/update-product', productController.updateProduct);
    router.post('/delete-product', productController.deleteProduct);

    
    router.post('/  ', userController.handleLogin);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/products', productController.getAllProducts);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;