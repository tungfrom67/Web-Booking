"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, MapPin, Building, Star } from "lucide-react"
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

const areas = [
  {
    id: 1,
    name: "Quận 1",
    city: "Hồ Chí Minh",
    country: "Việt Nam",
    type: "Trung tâm thành phố",
    hotels: 89,
    attractions: 25,
    rating: 4.8,
    popular: true,
    description: "Trung tâm thương mại và tài chính của TP.HCM",
    coordinates: "10.7769, 106.7009",
  },
  {
    id: 2,
    name: "Hoàn Kiếm",
    city: "Hà Nội",
    country: "Việt Nam",
    type: "Khu phố cổ",
    hotels: 67,
    attractions: 18,
    rating: 4.7,
    popular: true,
    description: "Khu phố cổ với hồ Hoàn Kiếm nổi tiếng",
    coordinates: "21.0285, 105.8542",
  },
  {
    id: 3,
    name: "Hải Châu",
    city: "Đà Nẵng",
    country: "Việt Nam",
    type: "Trung tâm thành phố",
    hotels: 45,
    attractions: 12,
    rating: 4.6,
    popular: true,
    description: "Trung tâm hành chính và thương mại Đà Nẵng",
    coordinates: "16.0471, 108.2068",
  },
  {
    id: 4,
    name: "Mỹ Khê",
    city: "Đà Nẵng",
    country: "Việt Nam",
    type: "Khu du lịch biển",
    hotels: 78,
    attractions: 8,
    rating: 4.9,
    popular: true,
    description: "Bãi biển đẹp nhất Đà Nẵng với resort cao cấp",
    coordinates: "16.0544, 108.2442",
  },
  {
    id: 5,
    name: "Silom",
    city: "Bangkok",
    country: "Thái Lan",
    type: "Khu tài chính",
    hotels: 156,
    attractions: 20,
    rating: 4.5,
    popular: true,
    description: "Trung tâm tài chính và giải trí Bangkok",
    coordinates: "13.7307, 100.5418",
  },
]

export default function AreasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredAreas = areas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.type.toLowerCase().includes(searchTerm.toLowerCase()),
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
            Quản lý khu vực
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý các khu vực trong thành phố
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm khu vực
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm khu vực mới</DialogTitle>
                <DialogDescription>Thêm khu vực mới vào hệ thống quản lý.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên khu vực</Label>
                    <Input id="name" placeholder="Quận 1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                        <SelectItem value="hn">Hà Nội</SelectItem>
                        <SelectItem value="dn">Đà Nẵng</SelectItem>
                        <SelectItem value="bkk">Bangkok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại khu vực</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">Trung tâm thành phố</SelectItem>
                        <SelectItem value="beach">Khu du lịch biển</SelectItem>
                        <SelectItem value="business">Khu kinh doanh</SelectItem>
                        <SelectItem value="historic">Khu lịch sử</SelectItem>
                        <SelectItem value="shopping">Khu mua sắm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">Tọa độ</Label>
                    <Input id="coordinates" placeholder="10.7769, 106.7009" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả về khu vực" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="popular" />
                  <Label htmlFor="popular">Khu vực phổ biến</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo khu vực</Button>
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
            placeholder="Tìm kiếm khu vực..."
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

      {/* Areas Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">{area.name}</CardTitle>
                      <CardDescription>
                        {area.city}, {area.country}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {area.popular && (
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
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-slate-50 text-slate-700">
                      {area.type}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{area.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{area.hotels}</div>
                      <div className="text-sm text-slate-600">Khách sạn</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{area.attractions}</div>
                      <div className="text-sm text-slate-600">Điểm tham quan</div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{area.description}</p>

                  <div className="text-xs text-slate-500">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {area.coordinates}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Building className="w-4 h-4 mr-2" />
                      Khách sạn
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      Bản đồ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
