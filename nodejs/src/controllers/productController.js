// controllers/productController.js
import CRUDServiceProduct from '../services/CRUDServiceProduct';
import multer from 'multer';
import path from 'path';

// Thiết lập lưu trữ file cho Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu file ảnh
    },
    filename: (req, file, cb) => {
        // Tạo tên file duy nhất bằng thời gian hiện tại và phần mở rộng của file gốc
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
let getAllProducts = async (req, res) => {
    try {
        let products = await CRUDServiceProduct.getAllProducts();  // Giả sử CRUDServiceProduct trả về danh sách sản phẩm
        return res.json({ products: products });  // Trả về dưới dạng JSON
    } catch (error) {
        console.log('Error getting products:', error);
        return res.status(500).json({ message: 'Error getting products' });
    }
};
// Hiển thị tất cả sản phẩm
let getAllProductsPage = async (req, res) => {
    try {
        let products = await CRUDServiceProduct.getAllProducts();
        return res.render('product/displayProducts.ejs', {
            products: products
        });
    } catch (error) {
        console.log('Error getting products:', error);
        return res.send('Error getting products');
    }
}

// Trang thêm sản phẩm mới
let createProductPage = async (req, res) => {
    try {
        let categories = await CRUDServiceProduct.getAllCategories();
        return res.render('product/createProduct.ejs', { categories: categories });
    } catch (error) {
        console.log('Error loading categories:', error);
        return res.send('Error loading categories');
    }
}

// Thêm sản phẩm mới (với xử lý hình ảnh)
let createProduct = async (req, res) => {
    try {
        let productData = req.body;
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`; // Đường dẫn file ảnh
        }
        let createdProduct = await CRUDServiceProduct.createNewProduct(productData);
        if (createdProduct) {
            return res.redirect('/get-allproducts'); // Redirect đến danh sách sản phẩm sau khi tạo thành công
        } else {
            return res.send('Error creating product');
        }
    } catch (error) {
        console.log('Error creating product:', error);
        return res.send('Error creating product');
    }
}

// Trang chỉnh sửa sản phẩm
let getEditProductPage = async (req, res) => {
    let productId = req.query.id;
    if (productId) {
        try {
            let product = await CRUDServiceProduct.getProductById(productId);
            let categories = await CRUDServiceProduct.getAllCategories();
            if (product) {
                return res.render('product/editProduct.ejs', {
                    product: product,
                    categories: categories
                });
            } else {
                return res.send('Product not found');
            }
        } catch (error) {
            console.log('Error fetching product:', error);
            return res.send('Error fetching product');
        }
    } else {
        return res.send('Product ID not provided');
    }
}

// Cập nhật sản phẩm (với xử lý hình ảnh)
let updateProduct = async (req, res) => {
    let productData = req.body;
    try {
        // Nếu có file ảnh mới được upload, cập nhật đường dẫn ảnh mới
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`; // Đường dẫn file ảnh mới
        }
        let updatedProduct = await CRUDServiceProduct.updateProduct(productData);
        if (updatedProduct) {
            return res.redirect('/get-allproducts'); // Redirect về trang danh sách sản phẩm sau khi cập nhật
        } else {
            return res.send('Error updating product');
        }
    } catch (error) {
        console.log('Error updating product:', error);
        return res.send('Error updating product');
    }
}

// Xóa sản phẩm
let deleteProduct = async (req, res) => {
    let productId = req.body.id;  // Lấy id sản phẩm từ body
    if (productId) {
        try {
            let deleted = await CRUDServiceProduct.deleteProductById(productId);
            if (deleted) {
                return res.redirect('/get-allproducts'); // Redirect về danh sách sản phẩm sau khi xóa
            } else {
                return res.send('Cannot delete product');
            }
        } catch (error) {
            console.log('Error deleting product:', error);
            return res.send('Error deleting product');
        }
    } else {
        return res.send('Product ID not provided');
    }
};

// Định nghĩa các route upload file
module.exports = {
    getAllProductsPage,
    createProductPage,
    getAllProducts,
    createProduct: [upload.single('image'), createProduct],  // Xử lý hình ảnh khi tạo sản phẩm mới
    getEditProductPage,
    updateProduct: [upload.single('image'), updateProduct], // Xử lý hình ảnh khi cập nhật sản phẩm
    deleteProduct
};
