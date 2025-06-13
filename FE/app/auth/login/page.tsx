"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password, rememberMe })
    // Implement login logic
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Chào mừng trở lại
            </motion.h2>
            <motion.p
              className="mt-2 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Đăng nhập để tiếp tục với HotelBooking
            </motion.p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <motion.form onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible">
                <motion.div className="space-y-4" variants={containerVariants}>
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

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(!!checked)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Ghi nhớ đăng nhập
                      </Label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                      Quên mật khẩu?
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Đăng nhập
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.form>
            </TabsContent>

            <TabsContent value="phone">
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" type="tel" placeholder="0912345678" required />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Tiếp tục</Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ y: 0, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </motion.button>
              <motion.button
                type="button"
                className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ y: 0, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
              >
                <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                Facebook
              </motion.button>
            </div>
          </div>

          <motion.p
            className="mt-8 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              Đăng ký ngay
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
