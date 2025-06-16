"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Star, TrendingUp, DollarSign, Search, MoreHorizontal, Mail, Phone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const vipCustomers = [
  {
    id: "VIP001",
    name: "Nguyễn Thị Lan",
    email: "nguyenthilan@email.com",
    phone: "+84 901 234 567",
    tier: "Diamond",
    points: 15420,
    totalSpent: "125,000,000 ₫",
    bookings: 28,
    joinDate: "2023-01-15",
    lastBooking: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "VIP002",
    name: "Trần Văn Minh",
    email: "tranvanminh@email.com",
    phone: "+84 902 345 678",
    tier: "Gold",
    points: 8750,
    totalSpent: "85,000,000 ₫",
    bookings: 18,
    joinDate: "2023-03-20",
    lastBooking: "2024-01-08",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "VIP003",
    name: "Lê Thị Hương",
    email: "lethihuong@email.com",
    phone: "+84 903 456 789",
    tier: "Silver",
    points: 4200,
    totalSpent: "45,000,000 ₫",
    bookings: 12,
    joinDate: "2023-06-10",
    lastBooking: "2024-01-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const tierData = [
  { name: "Diamond", value: 15, color: "#8b5cf6", customers: 45 },
  { name: "Gold", value: 25, color: "#f59e0b", customers: 128 },
  { name: "Silver", value: 35, color: "#6b7280", customers: 256 },
  { name: "Bronze", value: 25, color: "#cd7f32", customers: 189 },
]

const spendingData = [
  { month: "T1", Diamond: 45000000, Gold: 32000000, Silver: 18000000 },
  { month: "T2", Diamond: 52000000, Gold: 38000000, Silver: 22000000 },
  { month: "T3", Diamond: 48000000, Gold: 35000000, Silver: 20000000 },
  { month: "T4", Diamond: 58000000, Gold: 42000000, Silver: 25000000 },
  { month: "T5", Diamond: 62000000, Gold: 45000000, Silver: 28000000 },
  { month: "T6", Diamond: 68000000, Gold: 48000000, Silver: 30000000 },
]

const tierConfig = {
  Diamond: {
    color: "from-purple-500 to-pink-500",
    icon: Crown,
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
  },
  Gold: { color: "from-yellow-500 to-orange-500", icon: Star, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
  Silver: { color: "from-gray-400 to-gray-600", icon: Star, bgColor: "bg-gray-100", textColor: "text-gray-700" },
  Bronze: { color: "from-orange-600 to-red-600", icon: Star, bgColor: "bg-orange-100", textColor: "text-orange-700" },
}

export default function VIPCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTier, setSelectedTier] = useState("all")

  const filteredCustomers = vipCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = selectedTier === "all" || customer.tier === selectedTier
    return matchesSearch && matchesTier
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Khách hàng VIP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Quản lý khách hàng VIP và chương trình loyalty
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Tổng VIP", value: "618", icon: Crown, color: "from-purple-500 to-pink-500" },
          { title: "Doanh thu VIP", value: "2.8B ₫", icon: DollarSign, color: "from-green-500 to-emerald-500" },
          { title: "Điểm trung bình", value: "8,456", icon: Star, color: "from-yellow-500 to-orange-500" },
          { title: "Tăng trưởng", value: "+15.3%", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ hạng VIP</CardTitle>
              <CardDescription>Số lượng khách hàng theo từng hạng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tierData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any, props: any) => [`${props.payload.customers} khách hàng`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Spending Trends */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Chi tiêu theo hạng</CardTitle>
              <CardDescription>Xu hướng chi tiêu của từng hạng VIP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip formatter={(value: any) => [`${value.toLocaleString()} ₫`, ""]} />
                    <Legend />
                    <Bar dataKey="Diamond" name="Diamond" fill="#8b5cf6" />
                    <Bar dataKey="Gold" name="Gold" fill="#f59e0b" />
                    <Bar dataKey="Silver" name="Silver" fill="#6b7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm khách hàng VIP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedTier} onValueChange={setSelectedTier}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="Diamond">Diamond</TabsTrigger>
            <TabsTrigger value="Gold">Gold</TabsTrigger>
            <TabsTrigger value="Silver">Silver</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* VIP Customers List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách khách hàng VIP</CardTitle>
            <CardDescription>Thông tin chi tiết về khách hàng VIP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer, index) => {
                const TierIcon = tierConfig[customer.tier as keyof typeof tierConfig].icon
                const tierColor = tierConfig[customer.tier as keyof typeof tierConfig].color
                const bgColor = tierConfig[customer.tier as keyof typeof tierConfig].bgColor
                const textColor = tierConfig[customer.tier as keyof typeof tierConfig].textColor

                return (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback className={`${bgColor} ${textColor} text-lg font-bold`}>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{customer.name}</h3>
                            <Badge className={`${bgColor} ${textColor} border-0`}>
                              <TierIcon className="w-3 h-3 mr-1" />
                              {customer.tier}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {customer.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {customer.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-green-600">{customer.totalSpent}</div>
                        <div className="text-sm text-gray-500">{customer.bookings} đặt phòng</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                            <DropdownMenuItem>Lịch sử đặt phòng</DropdownMenuItem>
                            <DropdownMenuItem>Gửi ưu đãi</DropdownMenuItem>
                            <DropdownMenuItem>Nâng hạng</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Điểm loyalty:</span>
                          <span className="font-medium">{customer.points.toLocaleString()}</span>
                        </div>
                        <Progress value={(customer.points / 20000) * 100} className="h-2" />
                      </div>

                      <div className="text-sm">
                        <div className="text-gray-600">Tham gia:</div>
                        <div className="font-medium">{new Date(customer.joinDate).toLocaleDateString("vi-VN")}</div>
                      </div>

                      <div className="text-sm">
                        <div className="text-gray-600">Đặt phòng cuối:</div>
                        <div className="font-medium">{new Date(customer.lastBooking).toLocaleDateString("vi-VN")}</div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
