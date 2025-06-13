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
import {
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Calendar,
  Building2,
  Check,
  X,
  Eye,
  MessageSquare,
  Flag,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const reviews = [
  {
    id: "REV001",
    customerName: "Nguyễn Văn A",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    hotelName: "Vinpearl Luxury Nha Trang",
    rating: 5,
    comment: "Dịch vụ tuyệt vời, phòng sạch sẽ và nhân viên rất thân thiện. Tôi sẽ quay lại lần sau!",
    date: "2024-01-15",
    status: "published",
    reported: false,
  },
  {
    id: "REV002",
    customerName: "Trần Thị B",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    hotelName: "JW Marriott Hanoi",
    rating: 4,
    comment: "Phòng đẹp, view tốt nhưng dịch vụ ăn sáng còn hạn chế lựa chọn.",
    date: "2024-01-12",
    status: "published",
    reported: false,
  },
  {
    id: "REV003",
    customerName: "Lê Văn C",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    hotelName: "InterContinental Saigon",
    rating: 2,
    comment: "Phòng không được dọn dẹp kỹ, nhân viên phục vụ chậm.",
    date: "2024-01-10",
    status: "pending",
    reported: true,
  },
  {
    id: "REV004",
    customerName: "Phạm Thị D",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    hotelName: "Sheraton Nha Trang",
    rating: 5,
    comment: "Kỳ nghỉ tuyệt vời! Nhân viên rất chu đáo và phòng có view biển đẹp.",
    date: "2024-01-08",
    status: "published",
    reported: false,
  },
  {
    id: "REV005",
    customerName: "Hoàng Văn E",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    hotelName: "Mường Thanh Grand Đà Nẵng",
    rating: 3,
    comment: "Khách sạn ở vị trí tốt nhưng cơ sở vật chất hơi cũ.",
    date: "2024-01-05",
    status: "pending",
    reported: false,
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && review.status === "published") ||
      (activeTab === "pending" && review.status === "pending") ||
      (activeTab === "reported" && review.reported)

    return matchesSearch && matchesTab
  })

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý đánh giá</h1>
        <p className="text-gray-600 dark:text-gray-400">Quản lý và kiểm duyệt đánh giá của khách hàng</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo khách hàng, khách sạn, nội dung..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Lọc
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả ({reviews.length})</TabsTrigger>
          <TabsTrigger value="published">
            Đã đăng ({reviews.filter((r) => r.status === "published").length})
          </TabsTrigger>
          <TabsTrigger value="pending">Chờ duyệt ({reviews.filter((r) => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="reported">Bị báo cáo ({reviews.filter((r) => r.reported).length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá</CardTitle>
          <CardDescription>Quản lý và kiểm duyệt đánh giá từ khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Khách sạn</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={review.customerAvatar || "/placeholder.svg"} alt={review.customerName} />
                        <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{review.customerName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{review.hotelName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <div className="text-sm line-clamp-2">{review.comment}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(review.date).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant={review.status === "published" ? "default" : "secondary"}>
                        {review.status === "published" ? "Đã đăng" : "Chờ duyệt"}
                      </Badge>
                      {review.reported && (
                        <Badge variant="destructive" className="ml-2">
                          <Flag className="h-3 w-3 mr-1" />
                          Bị báo cáo
                        </Badge>
                      )}
                    </div>
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
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              Phê duyệt
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <X className="h-4 w-4 mr-2 text-red-600" />
                              Từ chối
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Phản hồi
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
