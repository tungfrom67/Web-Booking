"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Building, MapPin } from "lucide-react"
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

const countries = [
  {
    id: 1,
    name: "Việt Nam",
    code: "VN",
    continent: "Châu Á",
    currency: "VND",
    language: "Tiếng Việt",
    cities: 63,
    hotels: 1245,
    status: "active",
    popular: true,
    flag: "🇻🇳",
    timezone: "UTC+7",
    description: "Đất nước hình chữ S với bờ biển dài và văn hóa phong phú",
  },
  {
    id: 2,
    name: "Thái Lan",
    code: "TH",
    continent: "Châu Á",
    currency: "THB",
    language: "Tiếng Thái",
    cities: 77,
    hotels: 2156,
    status: "active",
    popular: true,
    flag: "🇹🇭",
    timezone: "UTC+7",
    description: "Xứ sở chùa vàng với du lịch phát triển",
  },
  {
    id: 3,
    name: "Singapore",
    code: "SG",
    continent: "Châu Á",
    currency: "SGD",
    language: "Tiếng Anh",
    cities: 1,
    hotels: 456,
    status: "active",
    popular: true,
    flag: "🇸🇬",
    timezone: "UTC+8",
    description: "Đảo quốc sư tử với kinh tế phát triển",
  },
  {
    id: 4,
    name: "Malaysia",
    code: "MY",
    continent: "Châu Á",
    currency: "MYR",
    language: "Tiếng Malay",
    cities: 13,
    hotels: 789,
    status: "active",
    popular: false,
    flag: "🇲🇾",
    timezone: "UTC+8",
    description: "Đất nước đa văn hóa với thiên nhiên tươi đẹp",
  },
]

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchTerm.toLowerCase()),
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
            Quản lý quốc gia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý danh sách các quốc gia trong hệ thống
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm quốc gia
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm quốc gia mới</DialogTitle>
                <DialogDescription>Thêm quốc gia mới vào hệ thống quản lý.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên quốc gia</Label>
                    <Input id="name" placeholder="Việt Nam" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Mã quốc gia</Label>
                    <Input id="code" placeholder="VN" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="continent">Châu lục</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn châu lục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia">Châu Á</SelectItem>
                        <SelectItem value="europe">Châu Âu</SelectItem>
                        <SelectItem value="america">Châu Mỹ</SelectItem>
                        <SelectItem value="africa">Châu Phi</SelectItem>
                        <SelectItem value="oceania">Châu Đại Dương</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                    <Input id="currency" placeholder="VND" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Ngôn ngữ</Label>
                    <Input id="language" placeholder="Tiếng Việt" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Múi giờ</Label>
                    <Input id="timezone" placeholder="UTC+7" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả về quốc gia" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="popular" />
                  <Label htmlFor="popular">Quốc gia phổ biến</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Tạo quốc gia</Button>
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
            placeholder="Tìm kiếm quốc gia..."
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

      {/* Countries Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCountries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{country.flag}</div>
                      <div>
                        <CardTitle className="group-hover:text-blue-600 transition-colors">{country.name}</CardTitle>
                        <CardDescription>{country.continent}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {country.popular && (
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Mã:</span>
                      <span className="ml-2 font-medium">{country.code}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Tiền tệ:</span>
                      <span className="ml-2 font-medium">{country.currency}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Ngôn ngữ:</span>
                      <span className="ml-2 font-medium">{country.language}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Múi giờ:</span>
                      <span className="ml-2 font-medium">{country.timezone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{country.cities}</div>
                      <div className="text-sm text-slate-600">Thành phố</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{country.hotels}</div>
                      <div className="text-sm text-slate-600">Khách sạn</div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{country.description}</p>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Building className="w-4 h-4 mr-2" />
                      Thành phố
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
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
