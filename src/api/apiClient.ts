
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Products API
export const getProducts = () => apiClient.get('/products');
export const getFeaturedProducts = () => apiClient.get('/products/featured');
export const getProductById = (id: string) => apiClient.get(`/products/${id}`);

// Auth API
export const register = (userData: { email: string; password: string; name: string }) => 
  apiClient.post('/auth/register', userData);

export const login = (credentials: { email: string; password: string }) => 
  apiClient.post('/auth/login', credentials);
