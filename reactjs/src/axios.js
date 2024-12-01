import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080', // Nếu không có biến env, dùng URL mặc định
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('Axios error: ', error);
        return Promise.reject(error);
    }
);

export default instance;
