import axios from '../axios';

// Lấy danh sách sản phẩm
const getAllProducts = () => {
    return axios.get('/api/products');
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
    createNewProductService,
    updateProductService,
    deleteProductService,
};
