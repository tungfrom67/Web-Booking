"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  RefreshCw,
  Download,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Legend,
} from "recharts"

// Data for charts
const realtimeData = [
  { time: "00:00", bookings: 12, revenue: 15000000, confirmed: 10, cancelled: 2 },
  { time: "04:00", bookings: 8, revenue: 9500000, confirmed: 7, cancelled: 1 },
  { time: "08:00", bookings: 25, revenue: 32000000, confirmed: 22, cancelled: 3 },
  { time: "12:00", bookings: 45, revenue: 58000000, confirmed: 40, cancelled: 5 },
  { time: "16:00", bookings: 38, revenue: 47000000, confirmed: 35, cancelled: 3 },
  { time: "20:00", bookings: 52, revenue: 68000000, confirmed: 48, cancelled: 4 },
]

const monthlyRevenueData = [
  { month: "T1", revenue: 120000000, target: 100000000, growth: 20 },
  { month: "T2", revenue: 150000000, target: 120000000, growth: 25 },
  { month: "T3", revenue: 180000000, target: 140000000, growth: 28.5 },
  { month: "T4", revenue: 160000000, target: 130000000, growth: 23 },
  { month: "T5", revenue: 190000000, target: 150000000, growth: 26.7 },
  { month: "T6", revenue: 220000000, target: 170000000, growth: 29.4 },
]

const customerSegmentData = [
  { name: "VIP Diamond", value: 15, color: "#8b5cf6", customers: 245 },
  { name: "VIP Gold", value: 25, color: "#f59e0b", customers: 567 },
  { name: "VIP Silver", value: 35, color: "#6b7280", customers: 892 },
  { name: "Regular", value: 25, color: "#3b82f6", customers: 1234 },
]

const paymentMethodData = [
  { name: "VNPay", value: 35, amount: 850000000, color: "#ef4444" },
  { name: "MoMo", value: 25, amount: 600000000, color: "#8b5cf6" },
  { name: "ZaloPay", value: 20, amount: 480000000, color: "#3b82f6" },
  { name: "Thẻ tín dụng", value: 15, amount: 360000000, color: "#10b981" },
  { name: "Chuyển khoản", value: 5, amount: 120000000, color: "#f59e0b" },
]

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const stats = [
    {
      title: "Tổng doanh thu",
      value: "2,450,000,000 ₫",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      description: "so với tháng trước",
    },
    {
      title: "Đặt phòng hôm nay",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      description: "so với hôm qua",
    },
    {
      title: "Khách sạn hoạt động",
      value: "89",
      change: "-2.1%",
      trend: "down",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      description: "so với tháng trước",
    },
    {
      title: "Khách hàng mới",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "so với tháng trước",
    },
  ]

  const topHotels = [
    {
      name: "Vinpearl Luxury Nha Trang",
      location: "Nha Trang",
      bookings: 45,
      revenue: "450,000,000 ₫",
      rating: 4.8,
      status: "active",
    },
    {
      name: "JW Marriott Hanoi",
      location: "Hà Nội",
      bookings: 38,
      revenue: "380,000,000 ₫",
      rating: 4.7,
      status: "active",
    },
    {
      name: "InterContinental Saigon",
      location: "TP.HCM",
      bookings: 42,
      revenue: "420,000,000 ₫",
      rating: 4.6,
      status: "active",
    },
  ]

  const recentBookings = [
    {
      id: "BK001",
      guest: "Nguyễn Văn A",
      hotel: "Vinpearl Luxury Nha Trang",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "confirmed",
      amount: "4,500,000 ₫",
    },
    {
      id: "BK002",
      guest: "Trần Thị B",
      hotel: "JW Marriott Hanoi",
      checkIn: "2024-01-16",
      checkOut: "2024-01-19",
      status: "pending",
      amount: "3,200,000 ₫",
    },
    {
      id: "BK003",
      guest: "Lê Văn C",
      hotel: "InterContinental Saigon",
      checkIn: "2024-01-17",
      checkOut: "2024-01-20",
      status: "confirmed",
      amount: "5,100,000 ₫",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Tổng quan về hoạt động kinh doanh
          </motion.p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{currentTime.toLocaleTimeString("vi-VN")}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 text-sm">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu & Mục tiêu</CardTitle>
              <CardDescription>So sánh doanh thu thực tế với mục tiêu đề ra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any, name: any) => {
                        if (name === "revenue" || name === "target") {
                          return [`${value.toLocaleString()} ₫`, name === "revenue" ? "Doanh thu" : "Mục tiêu"]
                        }
                        return [`${value}%`, "Tăng trưởng"]
                      }}
                    />
                    <Legend />
                    <Bar dataKey="target" name="Mục tiêu" fill="#e2e8f0" />
                    <Bar dataKey="revenue" name="Doanh thu" fill="#3b82f6" />
                    <Line type="monotone" dataKey="growth" name="Tăng trưởng %" stroke="#10b981" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Real-time Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động theo thời gian thực</CardTitle>
              <CardDescription>Đặt phòng, xác nhận và hủy trong 24h</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={realtimeData}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="bookings"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="url(#colorBookings)"
                      name="Tổng đặt phòng"
                    />
                    <Area
                      type="monotone"
                      dataKey="confirmed"
                      stackId="2"
                      stroke="#10b981"
                      fill="url(#colorConfirmed)"
                      name="Đã xác nhận"
                    />
                    <Area
                      type="monotone"
                      dataKey="cancelled"
                      stackId="3"
                      stroke="#ef4444"
                      fill="url(#colorCancelled)"
                      name="Đã hủy"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Customer Segments & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phân khúc khách hàng VIP</CardTitle>
              <CardDescription>Phân bổ khách hàng theo hạng thành viên</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any, props: any) => [`${props.payload.customers} khách hàng`, name]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Phân bổ theo phương thức và số tiền</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any, props: any) => [
                        `${props.payload.amount.toLocaleString()} ₫`,
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Hotels & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hotels */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card>
            <CardHeader>
              <CardTitle>Khách sạn hàng đầu</CardTitle>
              <CardDescription>Dựa trên doanh thu và số lượng đặt phòng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topHotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{hotel.location}</span>
                          <span>⭐ {hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{hotel.revenue}</div>
                      <div className="text-sm text-gray-600">{hotel.bookings} đặt phòng</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card>
            <CardHeader>
              <CardTitle>Đặt phòng gần đây</CardTitle>
              <CardDescription>Các đặt phòng mới nhất trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{booking.guest}</h4>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {booking.status === "confirmed"
                            ? "Đã xác nhận"
                            : booking.status === "pending"
                              ? "Chờ xử lý"
                              : "Đã hủy"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{booking.hotel}</p>
                      <p className="text-xs text-gray-500">
                        {booking.checkIn} - {booking.checkOut}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{booking.amount}</div>
                      <div className="text-xs text-gray-500">#{booking.id}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Xem tất cả đặt phòng
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
