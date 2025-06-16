"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, MapPin, Hotel, Flag } from "lucide-react"
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

const cities = [
  {
    id: 1,
    name: "Hồ Chí Minh",
    country: "Việt Nam",
    countryCode: "VN",
    region: "Miền Nam",
    population: "9,000,000",
    areas: 24,
    hotels: 456,
    status: "active",
    popular: true,
    description: "Thành phố lớn nhất Việt Nam, trung tâm kinh tế",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Hà Nội",
    country: "Việt Nam",
    countryCode: "VN",
    region: "Miền Bắc",
    population: "8,000,000",
    areas: 30,
    hotels: 389,
    status: "active",
    popular: true,
    description: "Thủ đô của Việt Nam, trung tâm chính trị văn hóa",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Đà Nẵng",
    country: "Việt Nam",
    countryCode: "VN",
    region: "Miền Trung",
    population: "1,200,000",
    areas: 8,
    hotels: 234,
    status: "active",
    popular: true,
    description: "Thành phố biển xinh đẹp, cửa ngõ miền Trung",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Bangkok",
    country: "Thái Lan",
    countryCode: "TH",
    region: "Central Thailand",
    population: "10,500,000",
    areas: 50,
    hotels: 789,
    status: "active",
    popular: true,
    description: "Thủ đô Thái Lan, trung tâm du lịch Đông Nam Á",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.region.toLowerCase().includes(searchTerm.toLowerCase()),
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
            Quản lý thành phố
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý danh sách các thành phố trong hệ thống
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm thành phố
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm thành phố mới</DialogTitle>
                <DialogDescription>Thêm thành phố mới vào hệ thống quản lý.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên thành phố</Label>
                    <Input id="name" placeholder="Hồ Chí Minh" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Quốc gia</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quốc gia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vn">Việt Nam</SelectItem>
                        <SelectItem value="th">Thái Lan</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="my">Malaysia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Vùng/Khu vực</Label>
                    <Input id="region" placeholder="Miền Nam" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="population">Dân số</Label>
                    <Input id="population" placeholder="9,000,000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả về thành phố" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Hình ảnh</Label>
                  <Input id="image" type="file" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="popular" />
                  <Label htmlFor="popular">Thành phố phổ biến</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo thành phố</Button>
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
            placeholder="Tìm kiếm thành phố..."
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

      {/* Cities Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* City Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-700 hover:bg-white">
                      <Flag className="w-3 h-3 mr-1" />
                      {city.countryCode}
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
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="group-hover:text-blue-600 transition-colors">{city.name}</span>
                    {city.popular && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Phổ biến
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {city.country} • {city.region}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Dân số:</span>
                      <span className="ml-2 font-medium">{city.population}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Khu vực:</span>
                      <span className="ml-2 font-medium">{city.areas}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{city.areas}</div>
                      <div className="text-sm text-slate-600">Khu vực</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{city.hotels}</div>
                      <div className="text-sm text-slate-600">Khách sạn</div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{city.description}</p>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      Khu vực
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Hotel className="w-4 h-4 mr-2" />
                      Khách sạn
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
