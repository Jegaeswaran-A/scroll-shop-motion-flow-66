
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Set timeout to prevent infinite loading
  timeout: 10000,
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
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out. Please try again.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);

// Products API
export const getProducts = () => apiClient.get('/products');
export const getFeaturedProducts = () => apiClient.get('/products/featured');
export const getProductById = (id: string) => apiClient.get(`/products/${id}`);

// Auth API
export const register = (userData: { email: string; password: string; name: string }) => {
  console.log('Sending registration request:', { ...userData, password: '***' });
  return apiClient.post('/auth/register', userData);
};

export const login = (credentials: { email: string; password: string }) => {
  console.log('Sending login request:', { ...credentials, password: '***' });
  return apiClient.post('/auth/login', credentials);
};
