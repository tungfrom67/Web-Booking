"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Crown,
  Star,
  Gift,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Award,
  DollarSign,
  Users,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const loyaltyTiers = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 999,
    color: "#cd7f32",
    benefits: ["5% giảm giá", "Check-in ưu tiên"],
    members: 1234,
    totalSpent: 45000000,
  },
  {
    name: "Silver",
    minPoints: 1000,
    maxPoints: 4999,
    color: "#c0c0c0",
    benefits: ["10% giảm giá", "Late checkout", "Welcome drink"],
    members: 567,
    totalSpent: 89000000,
  },
  {
    name: "Gold",
    minPoints: 5000,
    maxPoints: 9999,
    color: "#ffd700",
    benefits: ["15% giảm giá", "Room upgrade", "Spa discount"],
    members: 234,
    totalSpent: 156000000,
  },
  {
    name: "Diamond",
    minPoints: 10000,
    maxPoints: 999999,
    color: "#b9f2ff",
    benefits: ["20% giảm giá", "Suite upgrade", "Personal concierge"],
    members: 89,
    totalSpent: 234000000,
  },
]

const loyaltyMembers = [
  {
    id: "LM001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    tier: "Diamond",
    points: 15420,
    totalSpent: 45000000,
    joinDate: "2023-01-15",
    lastActivity: "2024-01-10",
    bookings: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "LM002",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    tier: "Gold",
    points: 7890,
    totalSpent: 28000000,
    joinDate: "2023-03-20",
    lastActivity: "2024-01-08",
    bookings: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "LM003",
    name: "Lê Văn C",
    email: "levanc@email.com",
    tier: "Silver",
    points: 3450,
    totalSpent: 15000000,
    joinDate: "2023-06-10",
    lastActivity: "2024-01-05",
    bookings: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const tierColors = {
  Bronze: "#cd7f32",
  Silver: "#c0c0c0",
  Gold: "#ffd700",
  Diamond: "#b9f2ff",
}

const pointsActivity = [
  { month: "T1", earned: 12500, redeemed: 8900 },
  { month: "T2", earned: 15600, redeemed: 11200 },
  { month: "T3", earned: 18900, redeemed: 13400 },
  { month: "T4", earned: 16700, redeemed: 12100 },
  { month: "T5", earned: 21300, redeemed: 15600 },
  { month: "T6", earned: 24500, redeemed: 17800 },
]

export default function LoyaltyProgramPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = loyaltyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.tier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalMembers = loyaltyTiers.reduce((sum, tier) => sum + tier.members, 0)
  const totalRevenue = loyaltyTiers.reduce((sum, tier) => sum + tier.totalSpent, 0)

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
            Chương trình Loyalty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Quản lý chương trình khách hàng thân thiết và điểm thưởng
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Gift className="w-4 h-4 mr-2" />
            Tạo ưu đãi
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Tổng thành viên",
            value: totalMembers.toLocaleString(),
            icon: Users,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Doanh thu Loyalty",
            value: `${(totalRevenue / 1000000).toFixed(0)}M ₫`,
            icon: DollarSign,
            color: "from-green-500 to-emerald-500",
          },
          { title: "Tỷ lệ tham gia", value: "68.5%", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
          { title: "Điểm TB/thành viên", value: "4,250", icon: Star, color: "from-orange-500 to-red-500" },
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

      {/* Loyalty Tiers Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ hạng thành viên</CardTitle>
              <CardDescription>Số lượng thành viên theo từng hạng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loyaltyTiers}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="members"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {loyaltyTiers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value} thành viên`, "Số lượng"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Points Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động điểm thưởng</CardTitle>
              <CardDescription>Điểm tích lũy và sử dụng theo tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pointsActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="earned" name="Điểm tích lũy" fill="#3b82f6" />
                    <Bar dataKey="redeemed" name="Điểm sử dụng" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Loyalty Tiers Details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết các hạng thành viên</CardTitle>
            <CardDescription>Thông tin về điều kiện và quyền lợi của từng hạng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loyaltyTiers.map((tier, index) => (
                <div key={tier.name} className="relative p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: tier.color }}
                    >
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: tier.color }}>
                        {tier.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} điểm
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Thành viên</p>
                      <p className="text-2xl font-bold">{tier.members.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                      <p className="text-lg font-semibold">{(tier.totalSpent / 1000000).toFixed(0)}M ₫</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Quyền lợi</p>
                      <div className="space-y-1">
                        {tier.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm thành viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
      </motion.div>

      {/* Members Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách thành viên Loyalty</CardTitle>
            <CardDescription>Quản lý thông tin và điểm thưởng của thành viên</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thành viên</TableHead>
                  <TableHead>Hạng</TableHead>
                  <TableHead>Điểm hiện tại</TableHead>
                  <TableHead>Tổng chi tiêu</TableHead>
                  <TableHead>Đặt phòng</TableHead>
                  <TableHead>Hoạt động cuối</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-white border-0"
                        style={{ backgroundColor: tierColors[member.tier as keyof typeof tierColors] }}
                      >
                        <Crown className="w-3 h-3 mr-1" />
                        {member.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{member.points.toLocaleString()}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: tierColors[member.tier as keyof typeof tierColors],
                              width: `${Math.min((member.points / 15000) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{(member.totalSpent / 1000000).toFixed(1)}M ₫</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{member.bookings} lần</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(member.lastActivity).toLocaleDateString("vi-VN")}</div>
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
                            Chỉnh sửa điểm
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Award className="w-4 h-4 mr-2" />
                            Thăng hạng
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Gift className="w-4 h-4 mr-2" />
                            Tặng ưu đãi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
