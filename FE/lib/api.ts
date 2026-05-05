import axios, { AxiosResponse, AxiosError } from "axios";

// ─── Interfaces ──────────────────────────────────────────
interface ApiResponse {
  message?: string;
  success?: boolean;
  data?: any;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    avatar?: string;
    [key: string]: any;
  };
  message?: string;
}

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

interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  user_type?: string;
  [key: string]: any;
}

interface BookingData {
  hotel_id: number;
  rooms: { room_id: number; quantity?: number }[];
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children?: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests?: string;
  promotion_code?: string;
}

interface SearchParams {
  destination?: string;
  check_in?: string;
  check_out?: string;
  adults?: number;
  children?: number;
  min_price?: number;
  max_price?: number;
  star_rating?: number;
  type?: string;
  amenities?: number[];
  sort_by?: string;
  per_page?: number;
  page?: number;
}

interface ReviewData {
  hotel_id: number;
  booking_id: number;
  overall_rating: number;
  cleanliness_rating?: number;
  service_rating?: number;
  location_rating?: number;
  value_rating?: number;
  title?: string;
  comment: string;
  pros?: string;
  cons?: string;
  trip_type?: string;
}

// ─── Axios Instance ──────────────────────────────────────
const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000") + "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// ─── Auth APIs ───────────────────────────────────────────
export const login = (data: LoginData): Promise<AxiosResponse<AuthResponse>> => api.post("/login", data);
export const register = (data: RegisterData): Promise<AxiosResponse<AuthResponse>> => api.post("/register", data);
export const logout = (): Promise<AxiosResponse<ApiResponse>> => api.post("/logout");
export const updateProfile = (data: Partial<ProfileData>): Promise<AxiosResponse> => api.post("/profile/update", data);
export const forgotPassword = (data: { email: string }): Promise<AxiosResponse<ApiResponse>> => api.post("/forgot-password", data);
export const resetPassword = (data: { token: string; email: string; password: string; password_confirmation: string }): Promise<AxiosResponse<ApiResponse>> => api.post("/reset-password", data);
export const handleGoogleCallback = (accessToken: string): Promise<AxiosResponse<AuthResponse>> => api.post("/auth/google", { access_token: accessToken });
export const handleFacebookCallback = (accessToken: string): Promise<AxiosResponse<AuthResponse>> => api.post("/auth/facebook", { access_token: accessToken });

// ─── Hotel APIs ──────────────────────────────────────────
export const getHotels = (params?: any): Promise<AxiosResponse> => api.get("/hotels", { params });
export const getHotelDetail = (id: string | number): Promise<AxiosResponse> => api.get(`/hotels/${id}`);
export const getFeaturedHotels = (limit?: number): Promise<AxiosResponse> => api.get("/hotels/featured", { params: { limit } });
export const searchHotels = (params: SearchParams): Promise<AxiosResponse> => api.post("/hotels/search", params);
export const getDestinations = (): Promise<AxiosResponse> => api.get("/hotels/destinations");

// ─── Room APIs ───────────────────────────────────────────
export const getHotelRooms = (hotelId: string | number, params?: any): Promise<AxiosResponse> => api.get(`/hotels/${hotelId}/rooms`, { params });
export const getRoomDetail = (hotelId: string | number, roomId: string | number): Promise<AxiosResponse> => api.get(`/hotels/${hotelId}/rooms/${roomId}`);
export const checkRoomAvailability = (data: { hotel_id: number; check_in: string; check_out: string; adults?: number; children?: number }): Promise<AxiosResponse> => api.post("/rooms/availability", data);

// ─── Booking APIs ────────────────────────────────────────
export const getBookings = (params?: any): Promise<AxiosResponse> => api.get("/bookings", { params });
export const getBookingDetail = (id: string | number): Promise<AxiosResponse> => api.get(`/bookings/${id}`);
export const createBooking = (data: BookingData): Promise<AxiosResponse> => api.post("/bookings", data);
export const cancelBooking = (id: string | number, reason?: string): Promise<AxiosResponse> => api.post(`/bookings/${id}/cancel`, { reason });

// ─── Review APIs ─────────────────────────────────────────
export const getHotelReviews = (hotelId: string | number, params?: any): Promise<AxiosResponse> => api.get(`/hotels/${hotelId}/reviews`, { params });
export const createReview = (data: ReviewData): Promise<AxiosResponse> => api.post("/reviews", data);
export const updateReview = (id: number, data: Partial<ReviewData>): Promise<AxiosResponse> => api.put(`/reviews/${id}`, data);
export const deleteReview = (id: number): Promise<AxiosResponse> => api.delete(`/reviews/${id}`);
export const voteReview = (id: number, voteType: "helpful" | "unhelpful"): Promise<AxiosResponse> => api.post(`/reviews/${id}/vote`, { vote_type: voteType });

// ─── Payment APIs ────────────────────────────────────────
export const getPaymentMethods = (): Promise<AxiosResponse> => api.get("/payment-methods");
export const processPayment = (data: { booking_id: number; payment_method_id: number; amount: number }): Promise<AxiosResponse> => api.post("/payments/process", data);
export const getPaymentStatus = (bookingId: string | number): Promise<AxiosResponse> => api.get(`/payments/status/${bookingId}`);

// ─── Admin APIs ──────────────────────────────────────────
export const adminGetBookings = (params?: any): Promise<AxiosResponse> => api.get("/admin/bookings", { params });
export const adminConfirmBooking = (id: number): Promise<AxiosResponse> => api.post(`/admin/bookings/${id}/confirm`);
export const adminCreateHotel = (data: any): Promise<AxiosResponse> => api.post("/admin/hotels", data);
export const adminUpdateHotel = (id: number, data: any): Promise<AxiosResponse> => api.put(`/admin/hotels/${id}`, data);
export const adminDeleteHotel = (id: number): Promise<AxiosResponse> => api.delete(`/admin/hotels/${id}`);
export const adminCreateRoom = (hotelId: number, data: any): Promise<AxiosResponse> => api.post(`/admin/hotels/${hotelId}/rooms`, data);
export const adminUpdateRoom = (hotelId: number, roomId: number, data: any): Promise<AxiosResponse> => api.put(`/admin/hotels/${hotelId}/rooms/${roomId}`, data);
export const adminDeleteRoom = (hotelId: number, roomId: number): Promise<AxiosResponse> => api.delete(`/admin/hotels/${hotelId}/rooms/${roomId}`);

export default api;