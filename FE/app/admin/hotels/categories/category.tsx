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
  Star,
  Building,
  Crown,
  Home,
  TreePine,
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

const categories = [
  {
    id: 1,
    name: "Khách sạn 5 sao",
    code: "5_star_hotel",
    description: "Khách sạn hạng sang với dịch vụ cao cấp",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
    hotelCount: 45,
    minStars: 5,
    maxStars: 5,
    features: ["Spa", "Pool", "Restaurant", "Concierge", "Room Service"],
    status: "active",
  },
  {
    id: 2,
    name: "Khách sạn 4 sao",
    code: "4_star_hotel",
    description: "Khách sạn cao cấp với tiện nghi đầy đủ",
    icon: Star,
    color: "from-blue-500 to-purple-500",
    hotelCount: 89,
    minStars: 4,
    maxStars: 4,
    features: ["Pool", "Restaurant", "Gym", "WiFi"],
    status: "active",
  },
  {
    id: 3,
    name: "Khách sạn 3 sao",
    code: "3_star_hotel",
    description: "Khách sạn tiêu chuẩn với dịch vụ tốt",
    icon: Building,
    color: "from-green-500 to-teal-500",
    hotelCount: 156,
    minStars: 3,
    maxStars: 3,
    features: ["Restaurant", "WiFi", "AC"],
    status: "active",
  },
  {
    id: 4,
    name: "Resort",
    code: "resort",
    description: "Khu nghỉ dưỡng với nhiều hoạt động giải trí",
    icon: TreePine,
    color: "from-emerald-500 to-green-500",
    hotelCount: 67,
    minStars: 3,
    maxStars: 5,
    features: ["Beach Access", "Multiple Pools", "Spa", "Activities"],
    status: "active",
  },
  {
    id: 5,
    name: "Homestay",
    code: "homestay",
    description: "Lưu trú tại nhà dân với trải nghiệm địa phương",
    icon: Home,
    color: "from-pink-500 to-rose-500",
    hotelCount: 234,
    minStars: 2,
    maxStars: 4,
    features: ["Local Experience", "Home Cooking", "Family Friendly"],
    status: "active",
  },
]

export default function HotelCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            Phân loại khách sạn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý các loại hình khách sạn và tiêu chuẩn phân loại
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm phân loại
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm phân loại mới</DialogTitle>
                <DialogDescription>Tạo phân loại khách sạn mới trong hệ thống.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên phân loại</Label>
                    <Input id="name" placeholder="Khách sạn 5 sao" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Mã phân loại</Label>
                    <Input id="code" placeholder="5_star_hotel" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minStars">Số sao tối thiểu</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn số sao" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 sao</SelectItem>
                        <SelectItem value="2">2 sao</SelectItem>
                        <SelectItem value="3">3 sao</SelectItem>
                        <SelectItem value="4">4 sao</SelectItem>
                        <SelectItem value="5">5 sao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStars">Số sao tối đa</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn số sao" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 sao</SelectItem>
                        <SelectItem value="2">2 sao</SelectItem>
                        <SelectItem value="3">3 sao</SelectItem>
                        <SelectItem value="4">4 sao</SelectItem>
                        <SelectItem value="5">5 sao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả về phân loại khách sạn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Tiện nghi đặc trưng</Label>
                  <Textarea id="features" placeholder="Spa, Pool, Restaurant (mỗi tiện nghi một dòng)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo phân loại</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm phân loại..."
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

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-blue-600 transition-colors">{category.name}</CardTitle>
                          <CardDescription>{category.code}</CardDescription>
                        </div>
                      </div>
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: category.maxStars }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < category.minStars ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="bg-slate-50">
                        {category.hotelCount} khách sạn
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Tiện nghi đặc trưng:</Label>
                      <div className="flex flex-wrap gap-1">
                        {category.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{category.hotelCount}</div>
                      <div className="text-sm text-slate-600">Khách sạn trong danh mục</div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Building className="w-4 h-4 mr-2" />
                      Xem khách sạn
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
