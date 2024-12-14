import axios from 'axios';

export const getCommentsByProductId = async (productId) => {
    const response = await axios.get(`http://localhost:8080/api/comments/${productId}`);
    return response.data;
};

export const addComment = async (data) => {
    const response = await axios.post('http://localhost:8080/api/comment', data);
    return response.data;
};
