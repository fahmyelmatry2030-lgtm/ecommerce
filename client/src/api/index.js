import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getStores = () => api.get('/stores');
export const getProducts = (storeId) => api.get(`/products/${storeId}`);
export const getProduct = (id) => api.get(`/product/${id}`);
export const getReviews = (id) => api.get(`/product/${id}/reviews`);
export const addReview = (id, data) => api.post(`/product/${id}/reviews`, data);
export const registerAgent = (data) => api.post('/agents/register', data);
export const getAgent = (id) => api.get(`/agents/${id}`);

export default api;
