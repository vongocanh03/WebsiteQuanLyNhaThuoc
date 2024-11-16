import axios from '../axios';

const getAllCategories = () => {
    return axios.get('/api/get-categories');
};

const createNewCategoryService = (data) => {
    return axios.post('/api/create-categories', data);
};

const updateCategoryService = (data) => {
    return axios.put('/api/update-categories', data);
};

const deleteCategoryService = (categoryId) => {
    return axios.delete('/api/delete-categories', {
        data: {
            id: categoryId
        }
    });
};

export {
    getAllCategories,
    createNewCategoryService,
    updateCategoryService,
    deleteCategoryService
};
