"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Gift,
  RefreshCw,
  Download,
  ImageIcon,
  Layout,
  FileText,
  Crown,
  BarChart3,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Legend,
} from "recharts"

// Enhanced data for comprehensive dashboard
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

const promotionData = [
  { type: "Mã giảm giá", active: 12, used: 245, revenue: 45000000 },
  { type: "Ưu đãi đặc biệt", active: 8, used: 156, revenue: 32000000 },
  { type: "Deal nhanh", active: 5, used: 89, revenue: 18000000 },
  { type: "Loyalty Points", active: 1, used: 567, revenue: 28000000 },
]

const paymentMethodData = [
  { name: "VNPay", value: 35, amount: 850000000, color: "#ef4444" },
  { name: "MoMo", value: 25, amount: 600000000, color: "#8b5cf6" },
  { name: "ZaloPay", value: 20, amount: 480000000, color: "#3b82f6" },
  { name: "Thẻ tín dụng", value: 15, amount: 360000000, color: "#10b981" },
  { name: "Chuyển khoản", value: 5, amount: 120000000, color: "#f59e0b" },
]

const contentMetrics = [
  { type: "Hình ảnh", total: 2456, uploaded: 45, views: 125000 },
  { type: "Banner", total: 24, active: 12, clicks: 8900 },
  { type: "Trang tĩnh", total: 18, published: 16, views: 45600 },
  { type: "Blog posts", total: 156, published: 142, views: 234000 },
]

const userActivityData = [
  { hour: "00", admin: 2, staff: 5, customers: 45 },
  { hour: "06", admin: 8, staff: 12, customers: 123 },
  { hour: "12", admin: 15, staff: 25, customers: 456 },
  { hour: "18", admin: 12, staff: 20, customers: 678 },
]

const loyaltyData = [
  { tier: "Bronze", members: 1234, points: 125000, color: "#cd7f32" },
  { tier: "Silver", members: 567, points: 285000, color: "#c0c0c0" },
  { tier: "Gold", members: 234, points: 456000, color: "#ffd700" },
  { tier: "Diamond", members: 89, points: 789000, color: "#b9f2ff" },
]

export default function EnhancedAdminDashboard() {
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const stats = [
    {
      title: "Doanh thu hôm nay",
      value: "245,000,000 ₫",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      description: "So với hôm qua",
    },
    {
      title: "Đặt phòng mới",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      description: "Trong 24h qua",
    },
    {
      title: "Khách hàng VIP",
      value: "1,245",
      change: "+15.3%",
      trend: "up",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      description: "Tổng thành viên VIP",
    },
    {
      title: "Tỷ lệ lấp đầy",
      value: "87.5%",
      change: "+3.1%",
      trend: "up",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      description: "Trung bình toàn hệ thống",
    },
  ]

  const quickActions = [
    { label: "Đặt phòng mới", icon: Calendar, color: "bg-blue-500", href: "/admin/bookings/new" },
    { label: "Thêm khách sạn", icon: Building2, color: "bg-green-500", href: "/admin/hotels/add" },
    { label: "Tạo khuyến mãi", icon: Gift, color: "bg-purple-500", href: "/admin/promotions/new" },
    { label: "Xem báo cáo", icon: BarChart3, color: "bg-orange-500", href: "/admin/analytics/reports" },
  ]

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Tổng quan</h1>
          <p className="text-gray-600 mt-1">
            Chào mừng trở lại! Hôm nay là{" "}
            {currentTime.toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-16 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all"
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
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
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="bookings">Đặt phòng</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
          <TabsTrigger value="promotions">Khuyến mãi</TabsTrigger>
          <TabsTrigger value="payments">Thanh toán</TabsTrigger>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
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

            {/* Real-time Activity */}
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
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đặt phòng mới</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+12% so với hôm qua</p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã xác nhận</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">Tỷ lệ: 91.0%</p>
                <Progress value={91} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã hủy</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">Tỷ lệ: 9.0%</p>
                <Progress value={9} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Xu hướng đặt phòng</CardTitle>
              <CardDescription>Phân tích chi tiết trạng thái đặt phòng theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeData}>
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
                    <Legend />
                    <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} name="Tổng đặt phòng" />
                    <Line type="monotone" dataKey="confirmed" stroke="#10b981" strokeWidth={2} name="Đã xác nhận" />
                    <Line type="monotone" dataKey="cancelled" stroke="#ef4444" strokeWidth={2} name="Đã hủy" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
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
                        formatter={(value: any, name: any, props: any) => [
                          `${props.payload.customers} khách hàng`,
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

            {/* Loyalty Program */}
            <Card>
              <CardHeader>
                <CardTitle>Chương trình Loyalty</CardTitle>
                <CardDescription>Thống kê điểm thưởng theo hạng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loyaltyData.map((tier, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                          <span className="font-medium">{tier.tier}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{tier.members} thành viên</div>
                          <div className="text-xs text-gray-500">{tier.points.toLocaleString()} điểm</div>
                        </div>
                      </div>
                      <Progress value={(tier.members / 2000) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động người dùng</CardTitle>
              <CardDescription>Phân tích hoạt động theo giờ trong ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="customers" name="Khách hàng" fill="#3b82f6" />
                    <Bar dataKey="staff" name="Nhân viên" fill="#10b981" />
                    <Bar dataKey="admin" name="Quản trị" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotionData.map((promo, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{promo.type}</CardTitle>
                  <Gift className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{promo.active}</div>
                  <p className="text-xs text-muted-foreground">Đang hoạt động</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Đã sử dụng:</span>
                      <span>{promo.used}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Doanh thu:</span>
                      <span>{(promo.revenue / 1000000).toFixed(0)}M ₫</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hiệu quả khuyến mãi</CardTitle>
              <CardDescription>So sánh doanh thu từ các loại khuyến mãi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={promotionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="type" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any, name: any) => {
                        if (name === "revenue") return [`${value.toLocaleString()} ₫`, "Doanh thu"]
                        return [value, name === "used" ? "Lượt sử dụng" : "Đang hoạt động"]
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Doanh thu" fill="#8b5cf6" />
                    <Bar dataKey="used" name="Lượt sử dụng" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods */}
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

            {/* Transaction Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Thống kê giao dịch</CardTitle>
                <CardDescription>Tổng quan về các giao dịch và hoàn tiền</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Giao dịch thành công</p>
                        <p className="text-sm text-gray-500">Hôm nay</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-green-600">+8.5%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Giao dịch thất bại</p>
                        <p className="text-sm text-gray-500">Hôm nay</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-red-600">-2.1%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <RefreshCw className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Hoàn tiền</p>
                        <p className="text-sm text-gray-500">Tuần này</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">45</p>
                      <p className="text-sm text-yellow-600">+1.2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentMetrics.map((content, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{content.type}</CardTitle>
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{content.total}</div>
                  <p className="text-xs text-muted-foreground">Tổng số</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Hoạt động:</span>
                      <span>{content.uploaded || content.active || content.published}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Lượt xem:</span>
                      <span>{content.views.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất nội dung</CardTitle>
                <CardDescription>Lượt xem và tương tác với nội dung</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contentMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="type" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="views" name="Lượt xem" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quản lý nội dung</CardTitle>
                <CardDescription>Trạng thái và thống kê nội dung</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Hình ảnh mới</span>
                    </div>
                    <Badge>+45 hôm nay</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Layout className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Banner hoạt động</span>
                    </div>
                    <Badge variant="secondary">12/24</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Trang tĩnh</span>
                    </div>
                    <Badge variant="outline">16 đã xuất bản</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
