import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    // We will store the token in localStorage with key 'access_token'
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 errors (token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
          try {
            // Call refresh endpoint
            // We use a direct axios call to avoid interceptor loop if this fails
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            });

            const { access_token, refresh_token: newRefreshToken } = response.data;

            // Update tokens
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', newRefreshToken);

            // Update headers
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

            // Retry original request
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed - clear tokens and redirect
            console.error('Token refresh failed:', refreshError);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token available
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
