"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import api from "@/lib/api"; // Sửa từ { api } thành default import
import { useRouter } from "next/router";

// Định nghĩa giao diện cho phản hồi từ forgotPassword
interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.forgotPassword({ email });
      if (response.data.success) {
        alert(response.data.message);
        router.push("/auth/login");
      } else {
        setError(response.data.message || "Yêu cầu thất bại. Vui lòng thử lại.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể gửi email. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
              Quên mật khẩu
            </motion.h2>
          </div>
          <motion.p
            className="mb-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Nhập email của bạn để nhận đường dẫn đặt lại mật khẩu
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Gửi yêu cầu
              </Button>
            </motion.div>
          </motion.form>
          <motion.p
            className="mt-8 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Quay lại{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Đăng nhập
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}