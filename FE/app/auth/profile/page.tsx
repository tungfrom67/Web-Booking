"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api"; // Sử dụng default import cho api
import { updateProfile } from "@/lib/api"; // Import named export updateProfile
import { useRouter } from "next/router";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    address: "",
    avatar: "",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetch("http://localhost:8000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
          nationality: data.nationality || "",
          address: data.address || "",
          avatar: data.avatar || "",
          language: data.language || "vi",
          timezone: data.timezone || "Asia/Ho_Chi_Minh",
        });
      })
      .catch(() => setError("Không thể tải thông tin hồ sơ. Vui lòng thử lại."));
  }, [router, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await updateProfile(formData); // Sử dụng updateProfile trực tiếp
      if (response.data.message) {
        alert("Cập nhật hồ sơ thành công!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Cập nhật thất bại. Vui lòng kiểm tra lại thông tin.");
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
            <Link href="/dashboard">
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
              Cập nhật hồ sơ
            </motion.h2>
          </div>
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="first_name">Họ</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="last_name">Tên</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="date_of_birth">Ngày sinh</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="gender">Giới tính</Label>
              <select
                id="gender"
                name="gender"
                className="w-full p-2 border rounded-md"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="nationality">Quốc tịch</Label>
              <Input
                id="nationality"
                name="nationality"
                type="text"
                value={formData.nationality}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="address">Địa chỉ</Label>
              <textarea
                id="address"
                name="address"
                className="w-full p-2 border rounded-md"
                value={formData.address}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="avatar">URL Avatar</Label>
              <Input
                id="avatar"
                name="avatar"
                type="text"
                value={formData.avatar}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="language">Ngôn ngữ</Label>
              <select
                id="language"
                name="language"
                className="w-full p-2 border rounded-md"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">Tiếng Anh</option>
              </select>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="timezone">Múi giờ</Label>
              <select
                id="timezone"
                name="timezone"
                className="w-full p-2 border rounded-md"
                value={formData.timezone}
                onChange={handleChange}
              >
                <option value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh</option>
                <option value="UTC">UTC</option>
              </select>
            </motion.div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Cập nhật
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}