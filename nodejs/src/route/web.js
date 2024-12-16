import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import productController from '../controllers/productController';
import orderController from '../controllers/orderController';
import supportController from '../controllers/supportController';
import cartController from '../controllers/cartController';
import momoController from '../controllers/momoController';
import paymentController from '../controllers/paymentController';
import commentsController from '../controllers/commentsController';
import symptomController from '../controllers/symptomController';
import productsymptomController from '../controllers/productsymptomController';
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

    router.get('/categories/create', categoryController.createCategoryPage); // Trang tạo category
    router.post('/post-create', categoryController.handleCreateCategory); // Tạo category (dùng chung với API)
    router.get('/categories/edit/:id', categoryController.getEditCategoryPage); // Chỉnh sửa thể loại, nhận ID từ URL
    router.post('/categories/update', categoryController.handleUpdateCategory); // Cập nhật category (dùng chung với API)
    router.post('/categories/delete', categoryController.handleDeleteCategory); // Xóa category (dùng chung với API)
    router.get('/get-allcategories', categoryController.handleGetAllCategoriesPage); // Hiển thị tất cả category


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
    // API routes
    router.get('/api/products/:id', productController.handleGetProductById); // Lấy sản phẩm theo ID


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

    router.post('/api/orders/create', orderController.createOrder);
    router.get('/api/orders', orderController.getAllOrders);
    router.get('/api/orders/:id', orderController.getOrderById);
    router.put('/api/orders/:id', orderController.updateOrder);
    router.delete('/api/orders/:id', orderController.deleteOrder);
    // Lấy tất cả đơn hàng của người dùng
    router.get('/api/orders/user/:userId', orderController.getOrdersByUser);

    // Cập nhật trạng thái thanh toán của đơn hàng
    router.put('/api/orders/payment-status', orderController.updatePaymentStatus);
    // Route tạo yêu cầu hỗ trợ
    router.post('/api/support', supportController.createSupportRequest);

    // Route lấy tất cả yêu cầu hỗ trợ
    router.get('/api/support', supportController.getAllSupportRequests);
    // Cập nhật trạng thái yêu cầu hỗ trợ
    router.put('/api/support/:id', supportController.updateSupportRequestStatus);
    // Return router middleware
    router.post('/api/save', cartController.saveCart);
    router.get('/:userId', cartController.getCartByUser);
    router.post('/api/momo/pay', momoController.momoPayment);

    // API tạo thanh toán
    router.post('/payments', paymentController.createPayment);

    // API lấy thống kê thanh toán
    router.get('/payments', paymentController.getPaymentStatistics);

    router.post('/api/comment', commentsController.addComment);

    // API lấy thống kê thanh toán
    router.get('/api/comments/:productId', commentsController.getCommentsByProductId);

    router.post('/api/symptoms/suggest', symptomController.suggestProducts);

    router.get('/api/symptoms', symptomController.listSymptoms);
    router.post('/api/symptoms', symptomController.createSymptom);
    router.put('/api/symptoms/:id', symptomController.updateSymptom);
    router.delete('/api/symptoms/:id', symptomController.deleteSymptom);

    router.post('/productsymptoms', productsymptomController.createProductsymptom);
    return app.use("/", router);
};

module.exports = initWebRoutes;
