// FE/lib/api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

// Giao diện chung cho phản hồi
interface ApiResponse {
  message?: string;
  success?: boolean;
  data?: any;
}

// Giao diện cho Auth
interface AuthResponse extends ApiResponse {
  token: string;
  user: {
    user_type: string;
    [key: string]: any; // Cho phép thêm thuộc tính khác nếu cần
  };
}

// Giao diện cho Profile
interface ProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  address: string;
  avatar: string;
  language: string;
  timezone: string;
}

interface ProfileResponse extends ApiResponse {
  data?: ProfileData;
}

// Giao diện cho các yêu cầu khác (tuỳ chỉnh theo endpoint)
interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}

interface RegisterData {
  email: string;
  phone?: string;
  password: string;
  [key: string]: any; // Cho phép thêm trường khác
}

interface ChangePasswordData {
  old_password: string;
  new_password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface BookingData {
  hotel_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  [key: string]: any; // Cho phép thêm trường khác
}

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
    return Promise.reject(error.response?.data || error.message);
  }
);

// Định nghĩa và export named methods
export const login = (data: LoginData): Promise<AxiosResponse<AuthResponse>> => api.post('/login', data);
export const register = (data: RegisterData): Promise<AxiosResponse<AuthResponse>> => api.post('/register', data);
export const logout = (): Promise<AxiosResponse<ApiResponse>> => api.post('/logout');
export const updateProfile = (data: ProfileData): Promise<AxiosResponse<ProfileResponse>> => api.put('/profile', data);
export const getProfile = (): Promise<AxiosResponse<ProfileResponse>> => api.get('/profile');
export const changePassword = (data: ChangePasswordData): Promise<AxiosResponse<ApiResponse>> => api.post('/change-password', data);
export const forgotPassword = (data: ForgotPasswordData): Promise<AxiosResponse<ApiResponse>> => api.post('/forgot-password', data);
export const resetPassword = (data: ResetPasswordData): Promise<AxiosResponse<ApiResponse>> => api.post('/reset-password', data);
export const redirectToGoogle = (): Promise<AxiosResponse> => api.get('/auth/google');
export const handleGoogleCallback = (code: string): Promise<AxiosResponse<AuthResponse>> => api.get(`/auth/google/callback?code=${code}`);
export const redirectToFacebook = (): Promise<AxiosResponse> => api.get('/auth/facebook');
export const handleFacebookCallback = (code: string): Promise<AxiosResponse<AuthResponse>> => api.get(`/auth/facebook/callback?code=${code}`);
export const getHotels = (params?: any): Promise<AxiosResponse> => api.get('/hotels', { params });
export const bookRoom = (data: BookingData): Promise<AxiosResponse<ApiResponse>> => api.post('/bookings', data);
export const cancelBooking = (bookingId: string): Promise<AxiosResponse<ApiResponse>> => api.delete(`/bookings/${bookingId}`);

// Export default (nếu cần)
export default api;