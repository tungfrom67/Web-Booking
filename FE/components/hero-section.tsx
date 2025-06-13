"use client"

import { motion } from "framer-motion"
import { SearchBar } from "@/components/search-bar"

export function HeroSection() {
  return (
    <div className="relative bg-blue-600 text-white overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
        }}
        initial={{ scale: 1.1, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Tìm chỗ nghỉ lý tưởng cho chuyến đi của bạn
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Khám phá hàng nghìn khách sạn, resort và căn hộ với giá tốt nhất
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SearchBar />
        </motion.div>

        {/* Genius Program Banner */}
        <motion.div
          className="mt-8 bg-blue-700 rounded-lg p-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Chương trình Genius</h3>
              <p>Đăng nhập để nhận giảm giá đến 10% tại hàng nghìn chỗ nghỉ</p>
            </div>
            <motion.button
              className="bg-white text-blue-700 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng nhập ngay
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
