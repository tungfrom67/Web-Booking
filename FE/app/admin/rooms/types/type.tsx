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
  Bed,
  Users,
  Home,
  Crown,
  Heart,
  Building,
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

const roomTypes = [
  {
    id: 1,
    name: "Standard Room",
    code: "STD",
    description: "Phòng tiêu chuẩn với tiện nghi cơ bản",
    icon: Home,
    color: "from-blue-500 to-cyan-500",
    capacity: { min: 1, max: 2 },
    bedTypes: ["Single", "Double"],
    size: { min: 20, max: 25 },
    priceRange: { min: 50, max: 100 },
    roomCount: 156,
    features: ["WiFi", "AC", "TV", "Bathroom"],
    status: "active",
  },
  {
    id: 2,
    name: "Superior Room",
    code: "SUP",
    description: "Phòng cao cấp với không gian rộng rãi hơn",
    icon: Building,
    color: "from-green-500 to-emerald-500",
    capacity: { min: 2, max: 3 },
    bedTypes: ["Double", "Twin"],
    size: { min: 25, max: 35 },
    priceRange: { min: 80, max: 150 },
    roomCount: 89,
    features: ["WiFi", "AC", "TV", "Minibar", "Balcony"],
    status: "active",
  },
  {
    id: 3,
    name: "Deluxe Room",
    code: "DLX",
    description: "Phòng deluxe với view đẹp và tiện nghi cao cấp",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    capacity: { min: 2, max: 4 },
    bedTypes: ["King", "Queen", "Twin"],
    size: { min: 35, max: 45 },
    priceRange: { min: 120, max: 250 },
    roomCount: 67,
    features: ["WiFi", "AC", "TV", "Minibar", "City View", "Bathtub"],
    status: "active",
  },
  {
    id: 4,
    name: "Suite",
    code: "STE",
    description: "Phòng suite với phòng khách riêng biệt",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
    capacity: { min: 2, max: 6 },
    bedTypes: ["King", "Queen"],
    size: { min: 50, max: 80 },
    priceRange: { min: 200, max: 500 },
    roomCount: 34,
    features: ["WiFi", "AC", "TV", "Minibar", "Living Room", "Kitchen", "Balcony"],
    status: "active",
  },
  {
    id: 5,
    name: "Family Room",
    code: "FAM",
    description: "Phòng gia đình với không gian lớn cho nhiều người",
    icon: Users,
    color: "from-teal-500 to-green-500",
    capacity: { min: 4, max: 8 },
    bedTypes: ["King + Bunk", "Multiple Beds"],
    size: { min: 40, max: 60 },
    priceRange: { min: 150, max: 300 },
    roomCount: 45,
    features: ["WiFi", "AC", "TV", "Kitchenette", "Extra Space"],
    status: "active",
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    code: "HON",
    description: "Phòng tân hôn lãng mạn với tiện nghi đặc biệt",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    capacity: { min: 2, max: 2 },
    bedTypes: ["King"],
    size: { min: 45, max: 70 },
    priceRange: { min: 250, max: 600 },
    roomCount: 12,
    features: ["WiFi", "AC", "TV", "Jacuzzi", "Romantic Decor", "Champagne"],
    status: "active",
  },
]

export default function RoomTypesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredRoomTypes = roomTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.code.toLowerCase().includes(searchTerm.toLowerCase()),
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
            Loại phòng
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý các loại phòng và tiêu chuẩn phân loại
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm loại phòng
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm loại phòng mới</DialogTitle>
                <DialogDescription>Tạo loại phòng mới trong hệ thống quản lý.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên loại phòng</Label>
                    <Input id="name" placeholder="Standard Room" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Mã loại phòng</Label>
                    <Input id="code" placeholder="STD" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả về loại phòng" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCapacity">Sức chứa tối thiểu</Label>
                    <Input id="minCapacity" type="number" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxCapacity">Sức chứa tối đa</Label>
                    <Input id="maxCapacity" type="number" placeholder="2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minSize">Diện tích tối thiểu (m²)</Label>
                    <Input id="minSize" type="number" placeholder="20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSize">Diện tích tối đa (m²)</Label>
                    <Input id="maxSize" type="number" placeholder="25" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPrice">Giá tối thiểu ($)</Label>
                    <Input id="minPrice" type="number" placeholder="50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">Giá tối đa ($)</Label>
                    <Input id="maxPrice" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedTypes">Loại giường</Label>
                  <Textarea id="bedTypes" placeholder="Single, Double (mỗi loại một dòng)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Tiện nghi</Label>
                  <Textarea id="features" placeholder="WiFi, AC, TV (mỗi tiện nghi một dòng)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo loại phòng</Button>
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
            placeholder="Tìm kiếm loại phòng..."
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

      {/* Room Types Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredRoomTypes.map((roomType, index) => {
            const IconComponent = roomType.icon
            return (
              <motion.div
                key={roomType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${roomType.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${roomType.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-blue-600 transition-colors">{roomType.name}</CardTitle>
                          <CardDescription>{roomType.code}</CardDescription>
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
                    <p className="text-sm text-slate-600">{roomType.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Sức chứa:</span>
                        <span className="ml-2 font-medium">
                          {roomType.capacity.min}-{roomType.capacity.max} người
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Diện tích:</span>
                        <span className="ml-2 font-medium">
                          {roomType.size.min}-{roomType.size.max} m²
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Loại giường:</Label>
                      <div className="flex flex-wrap gap-1">
                        {roomType.bedTypes.map((bed, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <Bed className="w-3 h-3 mr-1" />
                            {bed}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Tiện nghi:</Label>
                      <div className="flex flex-wrap gap-1">
                        {roomType.features.slice(0, 4).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {roomType.features.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{roomType.features.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{roomType.roomCount}</div>
                        <div className="text-sm text-slate-600">Phòng</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          ${roomType.priceRange.min}-{roomType.priceRange.max}
                        </div>
                        <div className="text-sm text-slate-600">Giá/đêm</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Xem phòng
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
