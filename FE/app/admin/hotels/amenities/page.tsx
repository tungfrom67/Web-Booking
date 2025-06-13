"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Utensils,
  Wind,
  Tv,
  Shield,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const amenities = [
  {
    id: 1,
    name: "WiFi miễn phí",
    code: "free_wifi",
    category: "Internet & Technology",
    icon: Wifi,
    description: "Kết nối internet không dây miễn phí trong toàn bộ khách sạn",
    hotelCount: 245,
    popular: true,
    status: "active",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Bãi đỗ xe",
    code: "parking",
    category: "Transportation",
    icon: Car,
    description: "Bãi đỗ xe an toàn cho khách lưu trú",
    hotelCount: 189,
    popular: true,
    status: "active",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    name: "Nhà hàng",
    code: "restaurant",
    category: "Food & Beverage",
    icon: Utensils,
    description: "Nhà hàng phục vụ các món ăn đa dạng",
    hotelCount: 156,
    popular: true,
    status: "active",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    name: "Phòng gym",
    code: "fitness_center",
    category: "Recreation",
    icon: Dumbbell,
    description: "Phòng tập thể dục với thiết bị hiện đại",
    hotelCount: 134,
    popular: true,
    status: "active",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    name: "Hồ bơi",
    code: "swimming_pool",
    category: "Recreation",
    icon: Waves,
    description: "Hồ bơi ngoài trời hoặc trong nhà",
    hotelCount: 98,
    popular: true,
    status: "active",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 6,
    name: "Điều hòa",
    code: "air_conditioning",
    category: "Room Features",
    icon: Wind,
    description: "Hệ thống điều hòa không khí trong phòng",
    hotelCount: 234,
    popular: true,
    status: "active",
    color: "from-teal-500 to-green-500",
  },
  {
    id: 7,
    name: "TV màn hình phẳng",
    code: "flat_screen_tv",
    category: "Room Features",
    icon: Tv,
    description: "TV màn hình phẳng với kênh truyền hình cáp",
    hotelCount: 198,
    popular: true,
    status: "active",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 8,
    name: "An ninh 24/7",
    code: "24h_security",
    category: "Safety & Security",
    icon: Shield,
    description: "Dịch vụ an ninh và bảo vệ 24 giờ",
    hotelCount: 167,
    popular: false,
    status: "active",
    color: "from-red-500 to-pink-500",
  },
]

const categories = [
  "All",
  "Internet & Technology",
  "Transportation",
  "Food & Beverage",
  "Recreation",
  "Room Features",
  "Safety & Security",
]

export default function HotelAmenitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredAmenities = amenities.filter((amenity) => {
    const matchesSearch =
      amenity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      amenity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || amenity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
          >
            Tiện nghi khách sạn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý các tiện nghi và dịch vụ của khách sạn
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm tiện nghi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm tiện nghi mới</DialogTitle>
                <DialogDescription>Tạo tiện nghi mới cho khách sạn trong hệ thống.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên tiện nghi</Label>
                    <Input id="name" placeholder="WiFi miễn phí" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Mã tiện nghi</Label>
                    <Input id="code" placeholder="free_wifi" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internet">Internet & Technology</SelectItem>
                      <SelectItem value="transport">Transportation</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="recreation">Recreation</SelectItem>
                      <SelectItem value="room">Room Features</SelectItem>
                      <SelectItem value="safety">Safety & Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả chi tiết về tiện nghi" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="popular" />
                  <Label htmlFor="popular">Tiện nghi phổ biến</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo tiện nghi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm tiện nghi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "All" ? "Tất cả danh mục" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
      </motion.div>

      {/* Amenities Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredAmenities.map((amenity, index) => {
            const IconComponent = amenity.icon
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${amenity.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${amenity.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-blue-600 transition-colors">{amenity.name}</CardTitle>
                          <CardDescription>{amenity.category}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {amenity.popular && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Phổ biến
                          </Badge>
                        )}
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{amenity.description}</p>

                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{amenity.hotelCount}</div>
                      <div className="text-sm text-slate-600">Khách sạn sử dụng</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-slate-50">
                        {amenity.code}
                      </Badge>
                      <Badge
                        variant={amenity.status === "active" ? "default" : "secondary"}
                        className={
                          amenity.status === "active"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gray-500 hover:bg-gray-600 text-white"
                        }
                      >
                        {amenity.status === "active" ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Xem khách sạn
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAmenities.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Không tìm thấy tiện nghi</h3>
          <p className="text-slate-600 mb-4">Thử điều chỉnh tiêu chí tìm kiếm hoặc thêm tiện nghi mới.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm tiện nghi mới
          </Button>
        </motion.div>
      )}
    </div>
  )
}
