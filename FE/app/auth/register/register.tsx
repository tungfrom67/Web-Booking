'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Lock, Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import api, { register, redirectToGoogle, handleFacebookCallback } from '@/lib/api'; // Import cả default và named exports
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Định nghĩa giao diện cho form data
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  user_type: string;
  agreeTerms: boolean;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    user_type: 'customer',
    agreeTerms: false,
  });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.agreeTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng.');
      return;
    }
    try {
      const response: AxiosResponse = await register(formData); // Sử dụng phương thức register
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userType = response.data.user.user_type;
        const redirectPath = ['admin', 'manager'].includes(userType) ? '/admin' : '/dashboard';
        router.push(redirectPath);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: { access_token: string }) => {
      try {
        const res: AxiosResponse = await redirectToGoogle(); // Sử dụng phương thức redirectToGoogle
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          const userType = res.data.user.user_type;
          const redirectPath = ['admin', 'manager'].includes(userType) ? '/admin' : '/dashboard';
          router.push(redirectPath);
        }
      } catch (err: any) {
        setError('Đăng nhập Google thất bại. Vui lòng thử lại.');
      }
    },
    onError: () => setError('Đăng nhập Google thất bại. Vui lòng thử lại.'),
  });

  const facebookLogin = (response: { accessToken: string }) => {
    if (response.accessToken) {
      handleFacebookCallback(response.accessToken) // Sử dụng phương thức handleFacebookCallback
        .then((res: AxiosResponse) => {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            const userType = res.data.user.user_type;
            const redirectPath = ['admin', 'manager'].includes(userType) ? '/admin' : '/dashboard';
            router.push(redirectPath);
          }
        })
        .catch(() => setError('Đăng nhập Facebook thất bại. Vui lòng thử lại.'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <motion.h2
              className="text-3xl font-bold text-gray-900 ml-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Tạo tài khoản mới
            </motion.h2>
          </div>
          <motion.p
            className="mb-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Đăng ký để trải nghiệm đầy đủ các tính năng của HotelBooking
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="first_name">Họ</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Nguyễn"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="last_name">Tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Văn A"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="phone">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="user_type">Loại tài khoản</Label>
              <select
                id="user_type"
                name="user_type"
                className="w-full p-2 border rounded-md"
                value={formData.user_type}
                onChange={handleChange}
                required
              >
                <option value="customer">Khách hàng</option>
                <option value="partner">Đối tác</option>
                <option value="staff">Nhân viên</option>
                <option value="manager">Quản lý</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="password_confirmation">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
            <motion.div className="flex items-start space-x-2" variants={itemVariants}>
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                className="mt-1"
              />
              <Label htmlFor="agreeTerms" className="text-sm font-normal">
                Tôi đồng ý với{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </Link>
              </Label>
            </motion.div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={!formData.agreeTerms}>
                Đăng ký
              </Button>
            </motion.div>
          </motion.form>
          <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc đăng ký với</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ y: 0, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                onClick={() => googleLogin()}
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </motion.button>
              <FacebookLogin
                appId="your-facebook-app-id" // Thay bằng App ID thực
                onSuccess={facebookLogin}
                onFail={(error) => setError('Đăng nhập Facebook thất bại.')}
                render={({ onClick }) => (
                  <motion.button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ y: 0, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                    onClick={onClick}
                  >
                    <svg className="h-5 w-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                    Facebook
                  </motion.button>
                )}
              />
            </div>
          </motion.div>
          <motion.p
            className="mt-8 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Đăng nhập
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}