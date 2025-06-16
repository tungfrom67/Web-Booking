// FE/lib/api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  token: string;
  user: {
    user_type: string;
  };
}

// Định nghĩa và export named methods
export const login = (data: any): Promise<AxiosResponse<AuthResponse>> => api.post('/login', data);
export const register = (data: any): Promise<AxiosResponse<AuthResponse>> => api.post('/register', data);
export const logout = (): Promise<AxiosResponse> => api.post('/logout');
export const updateProfile = (data: any): Promise<AxiosResponse> => api.put('/profile', data);
export const getProfile = (): Promise<AxiosResponse> => api.get('/profile');
export const changePassword = (data: any): Promise<AxiosResponse> => api.post('/change-password', data);
export const forgotPassword = (data: any): Promise<AxiosResponse> => api.post('/forgot-password', data);
export const resetPassword = (data: any): Promise<AxiosResponse> => api.post('/reset-password', data);
export const redirectToGoogle = (): Promise<AxiosResponse> => api.get('/auth/google');
export const handleGoogleCallback = (code: string): Promise<AxiosResponse<AuthResponse>> => api.get(`/auth/google/callback?code=${code}`);
export const redirectToFacebook = (): Promise<AxiosResponse> => api.get('/auth/facebook');
export const handleFacebookCallback = (code: string): Promise<AxiosResponse<AuthResponse>> => api.get(`/auth/facebook/callback?code=${code}`);
export const getHotels = (params?: any): Promise<AxiosResponse> => api.get('/hotels', { params });
export const bookRoom = (data: any): Promise<AxiosResponse> => api.post('/bookings', data);
export const cancelBooking = (bookingId: string): Promise<AxiosResponse> => api.delete(`/bookings/${bookingId}`);

// Export default (nếu cần)
export default api;