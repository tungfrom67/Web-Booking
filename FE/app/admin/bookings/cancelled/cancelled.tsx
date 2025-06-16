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
  XCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle,
  Calendar,
  TrendingDown,
} from "lucide-react"

const cancelledBookings = [
  {
    id: "BK004",
    guestName: "Phạm Thị D",
    guestEmail: "phamthid@email.com",
    guestPhone: "+84 904 567 890",
    hotelName: "City Center Inn",
    roomType: "Business Suite",
    checkIn: "2024-01-25",
    checkOut: "2024-01-27",
    nights: 2,
    guests: 1,
    totalAmount: 3000000,
    cancelledDate: "2024-01-20",
    cancelReason: "Thay đổi kế hoạch",
    refundAmount: 2400000,
    refundStatus: "processed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK006",
    guestName: "Hoàng Văn F",
    guestEmail: "hoangvanf@email.com",
    guestPhone: "+84 906 789 012",
    hotelName: "Beach Resort",
    roomType: "Sea View Room",
    checkIn: "2024-01-30",
    checkOut: "2024-02-02",
    nights: 3,
    guests: 4,
    totalAmount: 4500000,
    cancelledDate: "2024-01-28",
    cancelReason: "Khẩn cấp gia đình",
    refundAmount: 3600000,
    refundStatus: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK007",
    guestName: "Nguyễn Thị G",
    guestEmail: "nguyenthig@email.com",
    guestPhone: "+84 907 890 123",
    hotelName: "Mountain View Lodge",
    roomType: "Standard Room",
    checkIn: "2024-02-05",
    checkOut: "2024-02-07",
    nights: 2,
    guests: 2,
    totalAmount: 2000000,
    cancelledDate: "2024-02-03",
    cancelReason: "Thời tiết xấu",
    refundAmount: 1000000,
    refundStatus: "processed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const refundStatusConfig = {
  processed: { color: "bg-green-500", label: "Đã hoàn tiền" },
  pending: { color: "bg-yellow-500", label: "Đang xử lý" },
  rejected: { color: "bg-red-500", label: "Từ chối" },
}

export default function CancelledBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBookings = cancelledBookings.filter(
    (booking) =>
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: cancelledBookings.length,
    totalLoss: cancelledBookings.reduce((sum, b) => sum + b.totalAmount, 0),
    totalRefund: cancelledBookings.reduce((sum, b) => sum + b.refundAmount, 0),
    avgCancelTime: 2.5, // days before check-in
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
          >
            Đặt phòng đã hủy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Quản lý các đặt phòng đã bị hủy và hoàn tiền
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
          { title: "Tổng đã hủy", value: stats.total, icon: XCircle, color: "from-red-500 to-pink-500" },
          {
            title: "Doanh thu mất",
            value: `${(stats.totalLoss / 1000000).toFixed(1)}M ₫`,
            icon: TrendingDown,
            color: "from-orange-500 to-red-500",
          },
          {
            title: "Đã hoàn tiền",
            value: `${(stats.totalRefund / 1000000).toFixed(1)}M ₫`,
            icon: RefreshCw,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "TB hủy trước",
            value: `${stats.avgCancelTime} ngày`,
            icon: Calendar,
            color: "from-purple-500 to-pink-500",
          },
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
              <XCircle className="w-5 h-5 mr-2 text-red-600" />
              Danh sách đặt phòng đã hủy
            </CardTitle>
            <CardDescription>Tất cả đặt phòng đã bị hủy và thông tin hoàn tiền</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Khách sạn & Phòng</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Lý do hủy</TableHead>
                  <TableHead>Hoàn tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
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
                        <div className="text-sm text-red-500">
                          Hủy: {new Date(booking.cancelledDate).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{booking.cancelReason}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-blue-600">{booking.refundAmount.toLocaleString()} ₫</div>
                        <div className="text-xs text-gray-500">Từ {booking.totalAmount.toLocaleString()} ₫</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${refundStatusConfig[booking.refundStatus as keyof typeof refundStatusConfig].color} text-white`}
                      >
                        {refundStatusConfig[booking.refundStatus as keyof typeof refundStatusConfig].label}
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
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Xử lý hoàn tiền
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Tải biên lai
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
