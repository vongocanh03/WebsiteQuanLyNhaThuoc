import CRUDServiceProduct from '../services/CRUDServiceProduct';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let handleGetAllProducts = async (req, res) => {
    try {
        let products = await CRUDServiceProduct.getAllProducts();
        return res.json({ products: products });
    } catch (error) {
        console.log('Error getting products:', error);
        return res.status(500).json({ message: 'Error getting products' });
    }
};

let handleGetAllProductsPage = async (req, res) => {
    try {
        let products = await CRUDServiceProduct.getAllProducts();
        return res.render('product/displayProducts.ejs', { products: products });
    } catch (error) {
        console.log('Error getting products:', error);
        return res.send('Error getting products');
    }
};

let handleCreateProductPage = async (req, res) => {
    try {
        let categories = await CRUDServiceProduct.getAllCategories();
        return res.render('product/createProduct.ejs', { categories: categories });
    } catch (error) {
        console.log('Error loading categories:', error);
        return res.send('Error loading categories');
    }
};

let handleCreateProduct = async (req, res) => {
    try {
        
        let productData = req.body;
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }
        console.log('data:', productData);

        let createdProduct = await CRUDServiceProduct.createNewProduct(productData);
        if (createdProduct) {
            return res.redirect('/get-allproducts');
        } else {
            return res.send('Error creating product');
        }
    } catch (error) {
        console.log('Error creating product:', error);
        return res.send('Error creating product');
    }
};

let handleGetEditProductPage = async (req, res) => {
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
};

let handleUpdateProduct = async (req, res) => {
    let productData = req.body;
    try {
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }
        let updatedProduct = await CRUDServiceProduct.updateProduct(productData);
        if (updatedProduct) {
            return res.redirect('/get-allproducts');
        } else {
            return res.send('Error updating product');
        }
    } catch (error) {
        console.log('Error updating product:', error);
        return res.send('Error updating product');
    }
};

let handleDeleteProduct = async (req, res) => {
    let productId = req.body.id;
    if (productId) {
        try {
            let deleted = await CRUDServiceProduct.deleteProductById(productId);
            if (deleted) {
                return res.redirect('/get-allproducts');
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

module.exports = {
    handleGetAllProducts,
    handleGetAllProductsPage,
    handleCreateProductPage,
    handleCreateProduct: [upload.single('image'), handleCreateProduct],
    handleGetEditProductPage,
    handleUpdateProduct: [upload.single('image'), handleUpdateProduct],
    handleDeleteProduct
};
