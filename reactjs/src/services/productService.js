import axios from '../axios';

const getAllProducts = () => {
    return axios.get('/api/products');
};

const createNewProductService = (data) => {
    return axios.post('/api/products', data);
};

const updateProductService = (data) => {
    return axios.put('/api/products', data);
};

const deleteProductService = (productId) => {
    return axios.delete('/api/products', {
        data: {
            id: productId
        }
    });
};

export {
    getAllProducts,
    createNewProductService,
    updateProductService,
    deleteProductService
};
