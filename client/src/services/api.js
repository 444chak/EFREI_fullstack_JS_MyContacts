import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5555',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('token');
            // Force navigation to login with sessionExpired parameter
            if (typeof window !== 'undefined') {
                window.location.href = '/login?sessionExpired=true';
            }
        }
        return Promise.reject(error);
    }
);