"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, Users, Hotel, CreditCard, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "T1", revenue: 120000000, bookings: 156 },
  { month: "T2", revenue: 150000000, bookings: 187 },
  { month: "T3", revenue: 180000000, bookings: 212 },
  { month: "T4", revenue: 160000000, bookings: 198 },
  { month: "T5", revenue: 190000000, bookings: 234 },
  { month: "T6", revenue: 220000000, bookings: 267 },
  { month: "T7", revenue: 250000000, bookings: 298 },
  { month: "T8", revenue: 280000000, bookings: 312 },
  { month: "T9", revenue: 260000000, bookings: 287 },
  { month: "T10", revenue: 240000000, bookings: 265 },
  { month: "T11", revenue: 270000000, bookings: 301 },
  { month: "T12", revenue: 300000000, bookings: 345 },
]

const bookingSourceData = [
  { name: "Website", value: 45, color: "#3b82f6" },
  { name: "Mobile App", value: 30, color: "#10b981" },
  { name: "OTAs", value: 15, color: "#f59e0b" },
  { name: "Đại lý", value: 10, color: "#8b5cf6" },
]

const locationData = [
  { name: "Hà Nội", bookings: 345, revenue: 280000000 },
  { name: "TP.HCM", bookings: 421, revenue: 350000000 },
  { name: "Đà Nẵng", bookings: 287, revenue: 230000000 },
  { name: "Nha Trang", bookings: 198, revenue: 160000000 },
  { name: "Phú Quốc", bookings: 156, revenue: 130000000 },
]

const roomTypeData = [
  { name: "Standard", bookings: 456, revenue: 320000000 },
  { name: "Deluxe", bookings: 321, revenue: 290000000 },
  { name: "Suite", bookings: 187, revenue: 240000000 },
  { name: "Villa", bookings: 98, revenue: 210000000 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Thống kê & Phân tích</h1>
          <p className="text-gray-600 dark:text-gray-400">Phân tích dữ liệu kinh doanh và hiệu suất</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="bookings">Đặt phòng</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,420,000,000 ₫</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+12.5%</span> so với năm trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng đặt phòng</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,862</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+8.2%</span> so với năm trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+5.3%</span> so với năm trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tỷ lệ lấp đầy</CardTitle>
                <Hotel className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.5%</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+3.2%</span> so với năm trước
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu & Đặt phòng</CardTitle>
              <CardDescription>Phân tích doanh thu và số lượng đặt phòng theo tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis yAxisId="left" stroke="#64748b" />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any, name: any) => {
                        if (name === "revenue") return [`${value.toLocaleString()} ₫`, "Doanh thu"]
                        return [value, "Đặt phòng"]
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      name="Doanh thu"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bookings"
                      name="Đặt phòng"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Booking Source & Location */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nguồn đặt phòng</CardTitle>
                <CardDescription>Phân bổ đặt phòng theo nguồn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookingSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [`${value}%`, "Tỷ lệ"]}
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

            <Card>
              <CardHeader>
                <CardTitle>Phân bổ theo địa điểm</CardTitle>
                <CardDescription>Đặt phòng và doanh thu theo địa điểm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any, name: any) => {
                          if (name === "revenue") return [`${value.toLocaleString()} ₫`, "Doanh thu"]
                          return [value, "Đặt phòng"]
                        }}
                      />
                      <Legend />
                      <Bar dataKey="bookings" name="Đặt phòng" fill="#3b82f6" />
                      <Bar dataKey="revenue" name="Doanh thu" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích doanh thu</CardTitle>
              <CardDescription>Chi tiết doanh thu theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`${value.toLocaleString()} ₫`, "Doanh thu"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Doanh thu"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo loại phòng</CardTitle>
                <CardDescription>Phân tích doanh thu theo loại phòng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roomTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any) => [`${value.toLocaleString()} ₫`, "Doanh thu"]}
                      />
                      <Bar dataKey="revenue" name="Doanh thu" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo địa điểm</CardTitle>
                <CardDescription>Phân tích doanh thu theo địa điểm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any) => [`${value.toLocaleString()} ₫`, "Doanh thu"]}
                      />
                      <Bar dataKey="revenue" name="Doanh thu" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích đặt phòng</CardTitle>
              <CardDescription>Chi tiết đặt phòng theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      name="Đặt phòng"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Đặt phòng theo loại phòng</CardTitle>
                <CardDescription>Phân tích đặt phòng theo loại phòng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roomTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="bookings" name="Đặt phòng" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nguồn đặt phòng</CardTitle>
                <CardDescription>Phân bổ đặt phòng theo nguồn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookingSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [`${value}%`, "Tỷ lệ"]}
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
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích khách hàng</CardTitle>
              <CardDescription>Chi tiết về khách hàng và hành vi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Tổng khách hàng</p>
                      <p className="text-2xl font-bold">8,945</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Khách hàng mới</p>
                      <p className="text-2xl font-bold">1,245</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Tỷ lệ quay lại</p>
                      <p className="text-2xl font-bold">42.5%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Chi tiêu trung bình</p>
                      <p className="text-2xl font-bold">2,450,000 ₫</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Phân bổ khách hàng theo địa điểm</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="bookings" name="Khách hàng" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
