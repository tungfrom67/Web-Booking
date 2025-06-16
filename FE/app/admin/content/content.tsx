"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ImageIcon, Upload, Search, MoreHorizontal, Edit, Trash, Eye, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const images = [
  {
    id: "IMG001",
    name: "hotel-lobby.jpg",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-15",
    views: 1250,
    status: "active",
    category: "Hotel",
  },
  {
    id: "IMG002",
    name: "room-deluxe.jpg",
    size: "1.8 MB",
    dimensions: "1600x900",
    uploadDate: "2024-01-14",
    views: 890,
    status: "active",
    category: "Room",
  },
  {
    id: "IMG003",
    name: "restaurant-view.jpg",
    size: "3.1 MB",
    dimensions: "2048x1152",
    uploadDate: "2024-01-13",
    views: 567,
    status: "inactive",
    category: "Amenity",
  },
]

const banners = [
  {
    id: "BAN001",
    title: "Khuyến mãi mùa hè",
    position: "Homepage Hero",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    clicks: 8900,
    impressions: 45000,
    status: "active",
  },
  {
    id: "BAN002",
    title: "Ưu đãi cuối tuần",
    position: "Sidebar",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    clicks: 3400,
    impressions: 28000,
    status: "active",
  },
  {
    id: "BAN003",
    title: "Flash Deal Tết",
    position: "Footer",
    startDate: "2024-02-08",
    endDate: "2024-02-15",
    clicks: 1200,
    impressions: 15000,
    status: "expired",
  },
]

const pages = [
  {
    id: "PAGE001",
    title: "Về chúng tôi",
    slug: "about-us",
    status: "published",
    lastModified: "2024-01-15",
    views: 2340,
    author: "Admin",
  },
  {
    id: "PAGE002",
    title: "Điều khoản sử dụng",
    slug: "terms-of-service",
    status: "published",
    lastModified: "2024-01-10",
    views: 1890,
    author: "Admin",
  },
  {
    id: "PAGE003",
    title: "Chính sách bảo mật",
    slug: "privacy-policy",
    status: "draft",
    lastModified: "2024-01-12",
    views: 0,
    author: "Editor",
  },
]

const contentMetrics = [
  { type: "Hình ảnh", total: 2456, uploaded: 45, views: 125000 },
  { type: "Banner", total: 24, active: 12, clicks: 8900 },
  { type: "Trang tĩnh", total: 18, published: 16, views: 45600 },
  { type: "Blog posts", total: 156, published: 142, views: 234000 },
]

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("images")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Quản lý nội dung
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Quản lý hình ảnh, banner và trang tĩnh
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            Tải lên
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {contentMetrics.map((metric, index) => (
          <motion.div
            key={metric.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.type}</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.total}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Hoạt động:</span>
                    <span>{metric.uploaded || metric.active || metric.published}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Lượt xem:</span>
                    <span>{metric.views.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Content Performance Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                  <Tooltip />
                  <Bar dataKey="views" name="Lượt xem" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            <TabsTrigger value="banners">Banner</TabsTrigger>
            <TabsTrigger value="pages">Trang tĩnh</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thư viện hình ảnh</CardTitle>
                <CardDescription>Quản lý tất cả hình ảnh trên website</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hình ảnh</TableHead>
                      <TableHead>Kích thước</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Lượt xem</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {images.map((image) => (
                      <TableRow key={image.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">{image.name}</div>
                              <div className="text-sm text-gray-500">{image.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{image.size}</div>
                            <div className="text-sm text-gray-500">{image.dimensions}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{image.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{image.views.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={image.status === "active" ? "default" : "secondary"}>
                            {image.status === "active" ? "Hoạt động" : "Không hoạt động"}
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
                                Xem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Tải xuống
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="w-4 h-4 mr-2" />
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
          </TabsContent>

          <TabsContent value="banners" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý Banner</CardTitle>
                <CardDescription>Quản lý banner quảng cáo trên website</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Hiệu suất</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{banner.title}</div>
                            <div className="text-sm text-gray-500">{banner.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{banner.position}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{banner.startDate}</div>
                            <div className="text-sm text-gray-500">đến {banner.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{banner.clicks.toLocaleString()} clicks</div>
                            <div className="text-sm text-gray-500">{banner.impressions.toLocaleString()} views</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={banner.status === "active" ? "default" : "secondary"}>
                            {banner.status === "active"
                              ? "Hoạt động"
                              : banner.status === "expired"
                                ? "Hết hạn"
                                : "Không hoạt động"}
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
                                Xem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="w-4 h-4 mr-2" />
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
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trang tĩnh</CardTitle>
                <CardDescription>Quản lý các trang nội dung tĩnh</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trang</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Tác giả</TableHead>
                      <TableHead>Lượt xem</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{page.title}</div>
                            <div className="text-sm text-gray-500">Cập nhật: {page.lastModified}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">/{page.slug}</code>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{page.author}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{page.views.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={page.status === "published" ? "default" : "secondary"}>
                            {page.status === "published" ? "Đã xuất bản" : "Bản nháp"}
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
                                Xem
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="w-4 h-4 mr-2" />
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
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
