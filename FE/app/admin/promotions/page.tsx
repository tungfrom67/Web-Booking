"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Gift,
  Percent,
  Zap,
  Star,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Copy,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const promotions = [
  {
    id: "PROMO001",
    name: "Giảm giá mùa hè",
    type: "discount_code",
    code: "SUMMER2024",
    discount: "20%",
    minOrder: "2,000,000 ₫",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    used: 245,
    limit: 1000,
    status: "active",
    revenue: "45,000,000 ₫",
  },
  {
    id: "PROMO002",
    name: "Ưu đãi cuối tuần",
    type: "special_offer",
    code: "WEEKEND50",
    discount: "500,000 ₫",
    minOrder: "3,000,000 ₫",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    used: 156,
    limit: 500,
    status: "active",
    revenue: "32,000,000 ₫",
  },
  {
    id: "PROMO003",
    name: "Flash Deal Tết",
    type: "flash_deal",
    code: "TET2024",
    discount: "30%",
    minOrder: "1,500,000 ₫",
    startDate: "2024-02-08",
    endDate: "2024-02-15",
    used: 89,
    limit: 200,
    status: "expired",
    revenue: "18,000,000 ₫",
  },
]

const promotionStats = [
  { type: "Mã giảm giá", count: 12, revenue: 45000000, color: "#3b82f6" },
  { type: "Ưu đãi đặc biệt", count: 8, revenue: 32000000, color: "#10b981" },
  { type: "Flash Deal", count: 5, revenue: 18000000, color: "#f59e0b" },
  { type: "Loyalty Points", count: 1, revenue: 28000000, color: "#8b5cf6" },
]

const usageData = [
  { month: "T1", codes: 45, special: 32, flash: 18 },
  { month: "T2", codes: 52, special: 38, flash: 25 },
  { month: "T3", codes: 48, special: 35, flash: 22 },
  { month: "T4", codes: 58, special: 42, flash: 28 },
  { month: "T5", codes: 62, special: 45, flash: 30 },
  { month: "T6", codes: 68, special: 48, flash: 35 },
]

const typeConfig = {
  discount_code: {
    icon: Percent,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  special_offer: {
    icon: Star,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  flash_deal: {
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
}

const statusConfig = {
  active: { color: "bg-green-500", label: "Đang hoạt động" },
  expired: { color: "bg-gray-500", label: "Đã hết hạn" },
  scheduled: { color: "bg-blue-500", label: "Đã lên lịch" },
  paused: { color: "bg-yellow-500", label: "Tạm dừng" },
}

export default function PromotionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || promo.type === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Quản lý khuyến mãi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Tạo và quản lý các chương trình khuyến mãi
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Tạo khuyến mãi
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Tổng khuyến mãi", value: "26", icon: Gift, color: "from-purple-500 to-pink-500" },
          { title: "Đang hoạt động", value: "18", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
          { title: "Lượt sử dụng", value: "490", icon: Calendar, color: "from-blue-500 to-cyan-500" },
          { title: "Doanh thu", value: "95M ₫", icon: DollarSign, color: "from-yellow-500 to-orange-500" },
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
        {/* Promotion Types */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phân loại khuyến mãi</CardTitle>
              <CardDescription>Doanh thu theo từng loại khuyến mãi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={promotionStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="revenue"
                      label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                    >
                      {promotionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value.toLocaleString()} ₫`, "Doanh thu"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Trends */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng sử dụng</CardTitle>
              <CardDescription>Lượt sử dụng khuyến mãi theo tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="codes" name="Mã giảm giá" fill="#3b82f6" />
                    <Bar dataKey="special" name="Ưu đãi đặc biệt" fill="#10b981" />
                    <Bar dataKey="flash" name="Flash Deal" fill="#f59e0b" />
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
            placeholder="Tìm kiếm khuyến mãi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="discount_code">Mã giảm giá</TabsTrigger>
            <TabsTrigger value="special_offer">Ưu đãi đặc biệt</TabsTrigger>
            <TabsTrigger value="flash_deal">Flash Deal</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Promotions Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách khuyến mãi</CardTitle>
            <CardDescription>Quản lý tất cả các chương trình khuyến mãi</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khuyến mãi</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Mã code</TableHead>
                  <TableHead>Giảm giá</TableHead>
                  <TableHead>Sử dụng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => {
                  const TypeIcon = typeConfig[promo.type as keyof typeof typeConfig].icon
                  const typeColor = typeConfig[promo.type as keyof typeof typeConfig].color
                  const bgColor = typeConfig[promo.type as keyof typeof typeConfig].bgColor
                  const textColor = typeConfig[promo.type as keyof typeof typeConfig].textColor

                  return (
                    <TableRow key={promo.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{promo.name}</div>
                          <div className="text-sm text-gray-500">{promo.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${bgColor} ${textColor} border-0`}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {promo.type === "discount_code"
                            ? "Mã giảm giá"
                            : promo.type === "special_offer"
                              ? "Ưu đãi đặc biệt"
                              : "Flash Deal"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{promo.code}</code>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{promo.discount}</div>
                          <div className="text-sm text-gray-500">Tối thiểu: {promo.minOrder}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {promo.used}/{promo.limit}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(promo.used / promo.limit) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusConfig[promo.status as keyof typeof statusConfig].color} text-white`}
                        >
                          {statusConfig[promo.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Sao chép
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="w-4 h-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
