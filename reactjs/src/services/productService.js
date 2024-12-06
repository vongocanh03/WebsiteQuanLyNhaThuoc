import axios from '../axios';

// Lấy danh sách sản phẩm
const getAllProducts = () => {
    return axios.get('/api/products');
};
// Lấy chi tiết sản phẩm theo ID
const getProductById = async (id) => {
    const url = `http://localhost:8080/api/products/${id}`;
    console.log('Calling API:', url); // Log URL API
    return await axios.get(url);
};



// Tạo sản phẩm mới
const createNewProductService = (data) => {
    return axios.post('/api/products', data);
};

// Cập nhật sản phẩm
const updateProductService = (data) => {
    return axios.put('/api/products', data);
};

// Xóa sản phẩm
const deleteProductService = (productId) => {
    return axios.delete('/api/products', {
        data: { id: productId },
    });
};

export {
    getAllProducts,
    getProductById,
    createNewProductService,
    updateProductService,
    deleteProductService,
};
