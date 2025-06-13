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
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from "lucide-react"

const confirmedBookings = [
  {
    id: "BK001",
    guestName: "Nguyễn Văn A",
    guestEmail: "nguyenvana@email.com",
    guestPhone: "+84 901 234 567",
    hotelName: "Grand Palace Hotel",
    roomType: "Deluxe Suite",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    nights: 3,
    guests: 2,
    totalAmount: 4500000,
    confirmedDate: "2024-01-10",
    paymentStatus: "paid",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK003",
    guestName: "Lê Văn C",
    guestEmail: "levanc@email.com",
    guestPhone: "+84 903 456 789",
    hotelName: "Mountain Lodge",
    roomType: "Standard Room",
    checkIn: "2024-01-12",
    checkOut: "2024-01-14",
    nights: 2,
    guests: 1,
    totalAmount: 1600000,
    confirmedDate: "2024-01-08",
    paymentStatus: "paid",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK005",
    guestName: "Phạm Thị E",
    guestEmail: "phamthie@email.com",
    guestPhone: "+84 905 678 901",
    hotelName: "Ocean View Resort",
    roomType: "Ocean View Room",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    nights: 3,
    guests: 2,
    totalAmount: 3600000,
    confirmedDate: "2024-01-15",
    paymentStatus: "paid",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ConfirmedBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBookings = confirmedBookings.filter(
    (booking) =>
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: confirmedBookings.length,
    totalRevenue: confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0),
    avgBookingValue: confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0) / confirmedBookings.length,
    totalNights: confirmedBookings.reduce((sum, b) => sum + b.nights, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
          >
            Đặt phòng đã xác nhận
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Quản lý các đặt phòng đã được xác nhận
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Tổng đặt phòng", value: stats.total, icon: CheckCircle, color: "from-green-500 to-emerald-500" },
          {
            title: "Tổng doanh thu",
            value: `${(stats.totalRevenue / 1000000).toFixed(1)}M ₫`,
            icon: DollarSign,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Giá trị TB",
            value: `${(stats.avgBookingValue / 1000000).toFixed(1)}M ₫`,
            icon: Calendar,
            color: "from-purple-500 to-pink-500",
          },
          { title: "Tổng đêm", value: stats.totalNights, icon: Calendar, color: "from-orange-500 to-red-500" },
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

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên khách, khách sạn hoặc mã đặt phòng..."
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

      {/* Bookings Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Danh sách đặt phòng đã xác nhận
            </CardTitle>
            <CardDescription>Tất cả đặt phòng đã được xác nhận và thanh toán</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Khách sạn & Phòng</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Xác nhận</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={booking.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {booking.guestName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{booking.guestName}</div>
                          <div className="text-sm text-gray-500">{booking.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{booking.hotelName}</div>
                        <div className="text-sm text-gray-500">{booking.roomType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(booking.checkIn).toLocaleDateString("vi-VN")} -{" "}
                          {new Date(booking.checkOut).toLocaleDateString("vi-VN")}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.nights} đêm • {booking.guests} khách
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-green-600">{booking.totalAmount.toLocaleString()} ₫</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Đã xác nhận
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(booking.confirmedDate).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Đã thanh toán</Badge>
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
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Nhắn tin
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="w-4 h-4 mr-2" />
                            Gọi điện
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Gửi email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Tải hóa đơn
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
