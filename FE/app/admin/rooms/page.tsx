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
  Bath,
  Wifi,
  Coffee,
  Tv,
  Wind,
  DollarSign,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Dữ liệu mẫu cho phòng
const rooms = [
  {
    id: "RM001",
    name: "Deluxe King Room",
    hotel: "Grand Palace Hotel",
    hotelLocation: "Ho Chi Minh City",
    type: "Deluxe",
    capacity: 2,
    beds: "1 King",
    size: 35,
    price: 150,
    discountPrice: 135,
    status: "available",
    amenities: ["wifi", "tv", "ac", "minibar", "bathtub"],
    lastUpdated: "2 hours ago",
    image: "/placeholder.svg?height=200&width=300",
    description: "Spacious room with city view and modern amenities.",
  },
  {
    id: "RM002",
    name: "Superior Twin Room",
    hotel: "Ocean View Resort",
    hotelLocation: "Da Nang",
    type: "Superior",
    capacity: 2,
    beds: "2 Twin",
    size: 30,
    price: 120,
    discountPrice: null,
    status: "available",
    amenities: ["wifi", "tv", "ac"],
    lastUpdated: "5 hours ago",
    image: "/placeholder.svg?height=200&width=300",
    description: "Comfortable room with twin beds and partial ocean view.",
  },
  {
    id: "RM003",
    name: "Executive Suite",
    hotel: "Grand Palace Hotel",
    hotelLocation: "Ho Chi Minh City",
    type: "Suite",
    capacity: 3,
    beds: "1 King + 1 Sofa",
    size: 55,
    price: 250,
    discountPrice: 225,
    status: "available",
    amenities: ["wifi", "tv", "ac", "minibar", "bathtub", "kitchen"],
    lastUpdated: "1 day ago",
    image: "/placeholder.svg?height=200&width=300",
    description: "Luxurious suite with separate living area and premium amenities.",
  },
  {
    id: "RM004",
    name: "Standard Double Room",
    hotel: "City Center Inn",
    hotelLocation: "Hanoi",
    type: "Standard",
    capacity: 2,
    beds: "1 Double",
    size: 25,
    price: 80,
    discountPrice: null,
    status: "maintenance",
    amenities: ["wifi", "tv"],
    lastUpdated: "3 days ago",
    image: "/placeholder.svg?height=200&width=300",
    description: "Cozy room ideal for short stays in the city center.",
  },
  {
    id: "RM005",
    name: "Family Room",
    hotel: "Mountain Lodge",
    hotelLocation: "Sapa",
    type: "Family",
    capacity: 4,
    beds: "1 King + 2 Twin",
    size: 45,
    price: 180,
    discountPrice: null,
    status: "available",
    amenities: ["wifi", "tv", "ac", "minibar"],
    lastUpdated: "2 days ago",
    image: "/placeholder.svg?height=200&width=300",
    description: "Spacious room perfect for families with mountain views.",
  },
  {
    id: "RM006",
    name: "Honeymoon Suite",
    hotel: "Ocean View Resort",
    hotelLocation: "Da Nang",
    type: "Suite",
    capacity: 2,
    beds: "1 King",
    size: 60,
    price: 300,
    discountPrice: 270,
    status: "booked",
    amenities: ["wifi", "tv", "ac", "minibar", "bathtub", "balcony"],
    lastUpdated: "12 hours ago",
    image: "/placeholder.svg?height=200&width=300",
    description: "Romantic suite with private balcony and ocean views.",
  },
]

const amenityIcons = {
  wifi: Wifi,
  tv: Tv,
  ac: Wind,
  minibar: Coffee,
  bathtub: Bath,
  kitchen: Coffee,
  balcony: Users,
}

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "available" && room.status === "available") ||
      (selectedTab === "booked" && room.status === "booked") ||
      (selectedTab === "maintenance" && room.status === "maintenance")

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
          >
            Quản lý phòng
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý tất cả các phòng trong hệ thống khách sạn của bạn
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}>
            {viewMode === "grid" ? "Xem dạng bảng" : "Xem dạng lưới"}
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm phòng mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm phòng mới</DialogTitle>
                <DialogDescription>Tạo phòng mới trong hệ thống quản lý của bạn.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên phòng</Label>
                    <Input id="name" placeholder="Nhập tên phòng" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel">Khách sạn</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khách sạn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grand-palace">Grand Palace Hotel</SelectItem>
                        <SelectItem value="ocean-view">Ocean View Resort</SelectItem>
                        <SelectItem value="mountain-lodge">Mountain Lodge</SelectItem>
                        <SelectItem value="city-center">City Center Inn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại phòng</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="superior">Superior</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Sức chứa</Label>
                    <Input id="capacity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Diện tích (m²)</Label>
                    <Input id="size" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Giá phòng ($)</Label>
                    <Input id="price" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beds">Giường</Label>
                    <Input id="beds" placeholder="Ví dụ: 1 King, 2 Twin" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tiện nghi</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="wifi" />
                      <label htmlFor="wifi" className="text-sm">
                        WiFi
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tv" />
                      <label htmlFor="tv" className="text-sm">
                        TV
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ac" />
                      <label htmlFor="ac" className="text-sm">
                        Điều hòa
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="minibar" />
                      <label htmlFor="minibar" className="text-sm">
                        Minibar
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bathtub" />
                      <label htmlFor="bathtub" className="text-sm">
                        Bồn tắm
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="balcony" />
                      <label htmlFor="balcony" className="text-sm">
                        Ban công
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Nhập mô tả phòng" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Có sẵn</SelectItem>
                      <SelectItem value="booked">Đã đặt</SelectItem>
                      <SelectItem value="maintenance">Bảo trì</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo phòng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm phòng theo tên, khách sạn hoặc loại phòng..."
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

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả phòng ({rooms.length})</TabsTrigger>
            <TabsTrigger value="available">Có sẵn ({rooms.filter((r) => r.status === "available").length})</TabsTrigger>
            <TabsTrigger value="booked">Đã đặt ({rooms.filter((r) => r.status === "booked").length})</TabsTrigger>
            <TabsTrigger value="maintenance">
              Bảo trì ({rooms.filter((r) => r.status === "maintenance").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Rooms Display */}
      {viewMode === "grid" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Room Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={
                          room.status === "available"
                            ? "default"
                            : room.status === "booked"
                              ? "secondary"
                              : "destructive"
                        }
                        className={`${
                          room.status === "available"
                            ? "bg-green-500 hover:bg-green-600"
                            : room.status === "booked"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-orange-500 hover:bg-orange-600"
                        } text-white`}
                      >
                        {room.status === "available" ? "Có sẵn" : room.status === "booked" ? "Đã đặt" : "Bảo trì"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
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
                            Xóa phòng
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Room Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {room.name}
                        </h3>
                        <div className="flex items-center text-slate-600 mt-1">
                          <span className="text-sm">
                            {room.hotel}, {room.hotelLocation}
                          </span>
                        </div>
                      </div>

                      {/* Room Type and Price */}
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-slate-50 text-slate-700">
                          {room.type}
                        </Badge>
                        <div className="text-right">
                          {room.discountPrice ? (
                            <div className="flex flex-col items-end">
                              <span className="text-sm line-through text-slate-400">${room.price}</span>
                              <span className="font-semibold text-green-600">${room.discountPrice}</span>
                            </div>
                          ) : (
                            <span className="font-semibold">${room.price}</span>
                          )}
                          <span className="text-xs text-slate-500">/đêm</span>
                        </div>
                      </div>

                      {/* Room Details */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Bed className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="text-sm font-medium text-slate-900">{room.beds}</div>
                          <div className="text-xs text-slate-500">Giường</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="text-sm font-medium text-slate-900">{room.capacity} người</div>
                          <div className="text-xs text-slate-500">Sức chứa</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <DollarSign className="w-4 h-4 text-purple-500" />
                          </div>
                          <div className="text-sm font-medium text-slate-900">{room.size} m²</div>
                          <div className="text-xs text-slate-500">Diện tích</div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex items-center space-x-2">
                        {room.amenities.slice(0, 5).map((amenity) => {
                          const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi
                          return (
                            <div key={amenity} className="p-2 bg-slate-100 rounded-lg">
                              <Icon className="w-4 h-4 text-slate-600" />
                            </div>
                          )
                        })}
                        {room.amenities.length > 5 && (
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <span className="text-xs text-slate-600">+{room.amenities.length - 5}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 line-clamp-2">{room.description}</p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-500">Cập nhật {room.lastUpdated}</span>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-md border"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Phòng</TableHead>
                <TableHead>Khách sạn</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Sức chứa</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Giá
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={room.image || "/placeholder.svg"}
                          alt={room.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{room.name}</div>
                        <div className="text-xs text-gray-500">{room.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{room.hotel}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.capacity} người</TableCell>
                  <TableCell>
                    {room.discountPrice ? (
                      <div>
                        <span className="text-sm line-through text-gray-400">${room.price}</span>
                        <span className="ml-1 font-medium text-green-600">${room.discountPrice}</span>
                      </div>
                    ) : (
                      <span>${room.price}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {room.status === "available" ? (
                        <>
                          <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                          <span className="text-green-600">Có sẵn</span>
                        </>
                      ) : room.status === "booked" ? (
                        <>
                          <Users className="mr-1 h-4 w-4 text-blue-500" />
                          <span className="text-blue-600">Đã đặt</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 h-4 w-4 text-orange-500" />
                          <span className="text-orange-600">Bảo trì</span>
                        </>
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Không tìm thấy phòng</h3>
          <p className="text-slate-600 mb-4">Thử điều chỉnh tiêu chí tìm kiếm hoặc thêm phòng mới.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm phòng mới
          </Button>
        </motion.div>
      )}
    </div>
  )
}
