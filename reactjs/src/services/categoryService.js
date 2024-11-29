import axios from '../axios';

const getAllCategories =  () => {
    return axios.get('/api/get-categories');
};

const createNewCategoryService = (data) => {
    return axios.post('/api/create-category', data);
};

const updateCategoryService = (data) => {
    return axios.put('/api/update-category', data);
};

const deleteCategoryService = (categoryId) => {
    return axios.delete('/api/delete-category', {
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
