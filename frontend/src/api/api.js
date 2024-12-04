import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Add JWT token to every request if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (credentials) => API.post('/auth/login', credentials);

export const fetchUsers = (params) => API.get('/users', { params });

export const fetchUserDetails = (id) => API.get(`/users/${id}`);
