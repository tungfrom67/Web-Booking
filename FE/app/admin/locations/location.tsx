"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Globe,
  MapPin,
  Building,
  Flag,
  Hotel,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu
const countries = [
  {
    id: 1,
    name: "Việt Nam",
    code: "VN",
    continent: "Asia",
    cities: 25,
    hotels: 458,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Thailand",
    code: "TH",
    continent: "Asia",
    cities: 18,
    hotels: 325,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Japan",
    code: "JP",
    continent: "Asia",
    cities: 42,
    hotels: 876,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Singapore",
    code: "SG",
    continent: "Asia",
    cities: 1,
    hotels: 245,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "France",
    code: "FR",
    continent: "Europe",
    cities: 35,
    hotels: 1245,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "United States",
    code: "US",
    continent: "North America",
    cities: 156,
    hotels: 3245,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const cities = [
  {
    id: 1,
    name: "Ho Chi Minh City",
    country: "Vietnam",
    countryCode: "VN",
    hotels: 245,
    areas: 12,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Hanoi",
    country: "Vietnam",
    countryCode: "VN",
    hotels: 178,
    areas: 8,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Da Nang",
    country: "Vietnam",
    countryCode: "VN",
    hotels: 124,
    areas: 5,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Bangkok",
    country: "Thailand",
    countryCode: "TH",
    hotels: 312,
    areas: 15,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    hotels: 456,
    areas: 23,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    hotels: 245,
    areas: 10,
    popular: true,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("countries")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            Quản lý địa điểm
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Quản lý quốc gia, thành phố và khu vực trong hệ thống
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
                {selectedTab === "countries" ? "Thêm quốc gia" : "Thêm thành phố"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedTab === "countries" ? "Thêm quốc gia mới" : "Thêm thành phố mới"}</DialogTitle>
                <DialogDescription>
                  {selectedTab === "countries"
                    ? "Thêm quốc gia mới vào hệ thống quản lý của bạn."
                    : "Thêm thành phố mới vào hệ thống quản lý của bạn."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedTab === "countries" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Tên quốc gia</Label>
                        <Input id="name" placeholder="Nhập tên quốc gia" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="code">Mã quốc gia</Label>
                        <Input id="code" placeholder="VN, US, JP..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="continent">Châu lục</Label>
                      <Input id="continent" placeholder="Asia, Europe, North America..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea id="description" placeholder="Mô tả về quốc gia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Hình ảnh</Label>
                      <Input id="image" type="file" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Tên thành phố</Label>
                        <Input id="name" placeholder="Nhập tên thành phố" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Quốc gia</Label>
                        <Input id="country" placeholder="Chọn quốc gia" />
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
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  {selectedTab === "countries" ? "Tạo quốc gia" : "Tạo thành phố"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={`Tìm kiếm ${selectedTab === "countries" ? "quốc gia" : "thành phố"}...`}
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
            <TabsTrigger value="countries">
              <Globe className="w-4 h-4 mr-2" />
              Quốc gia ({countries.length})
            </TabsTrigger>
            <TabsTrigger value="cities">
              <Building className="w-4 h-4 mr-2" />
              Thành phố ({cities.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Content */}
      {selectedTab === "countries" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCountries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.image || "/placeholder.svg"}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-700 hover:bg-white">
                      <Flag className="w-3 h-3 mr-1" />
                      {country.code}
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
                    <span className="group-hover:text-blue-600 transition-colors">{country.name}</span>
                    {country.popular && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Phổ biến
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{country.continent}</CardDescription>
                </CardHeader>

                <CardContent>
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
                </CardContent>

                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Xem thành phố
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedTab === "cities" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
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
                  <CardDescription>{city.country}</CardDescription>
                </CardHeader>

                <CardContent>
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
                </CardContent>

                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Hotel className="w-4 h-4 mr-2" />
                    Xem khách sạn
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {((selectedTab === "countries" && filteredCountries.length === 0) ||
        (selectedTab === "cities" && filteredCities.length === 0)) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Không tìm thấy {selectedTab === "countries" ? "quốc gia" : "thành phố"}
          </h3>
          <p className="text-slate-600 mb-4">
            Thử điều chỉnh tiêu chí tìm kiếm hoặc thêm {selectedTab === "countries" ? "quốc gia" : "thành phố"} mới.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm {selectedTab === "countries" ? "quốc gia" : "thành phố"} mới
          </Button>
        </motion.div>
      )}
    </div>
  )
}
