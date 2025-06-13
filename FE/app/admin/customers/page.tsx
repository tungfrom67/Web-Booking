"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, Mail, Phone, MapPin, Calendar, User, Edit, Trash, Eye } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const customers = [
  {
    id: "CUS001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    location: "Hà Nội",
    totalBookings: 5,
    totalSpent: "12,500,000 ₫",
    lastBooking: "2024-01-15",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUS002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    location: "TP.HCM",
    totalBookings: 3,
    totalSpent: "8,200,000 ₫",
    lastBooking: "2024-01-10",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUS003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    location: "Đà Nẵng",
    totalBookings: 2,
    totalSpent: "5,800,000 ₫",
    lastBooking: "2024-01-05",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUS004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    location: "Nha Trang",
    totalBookings: 4,
    totalSpent: "10,300,000 ₫",
    lastBooking: "2024-01-12",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUS005",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    location: "Hải Phòng",
    totalBookings: 1,
    totalSpent: "3,200,000 ₫",
    lastBooking: "2023-12-28",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && customer.status === "active") ||
      (activeTab === "inactive" && customer.status === "inactive")

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý khách hàng</h1>
        <p className="text-gray-600 dark:text-gray-400">Quản lý và theo dõi thông tin khách hàng</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo tên, email, ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Lọc
        </Button>
        <Button>
          <User className="h-4 w-4 mr-2" />
          Thêm khách hàng
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả ({customers.length})</TabsTrigger>
          <TabsTrigger value="active">
            Đang hoạt động ({customers.filter((c) => c.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Không hoạt động ({customers.filter((c) => c.status === "inactive").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>Quản lý thông tin và lịch sử đặt phòng của khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Đặt phòng</TableHead>
                <TableHead>Chi tiêu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{customer.totalBookings} đặt phòng</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(customer.lastBooking).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.totalSpent}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
