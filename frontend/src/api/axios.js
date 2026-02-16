import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken) {
                    // Try to get a new token
                    const response = await axios.post('/api/token/refresh/', {
                        refresh: refreshToken
                    });

                    // Save new tokens
                    if (response.data.access) {
                        localStorage.setItem('access_token', response.data.access);
                        // Update default header
                        api.defaults.headers.Authorization = `Bearer ${response.data.access}`;
                        // Update original request header
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

                        // Retry original request
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                // If refresh fails, logout
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // If 401 and already retried, or no refresh token - logout
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);


export default api;
