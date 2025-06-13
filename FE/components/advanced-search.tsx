"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star, Wifi, Car, Coffee, Waves, Dumbbell, Filter, X, Search } from "lucide-react"

const amenities = [
  { id: "wifi", name: "Wifi miễn phí", icon: Wifi },
  { id: "parking", name: "Bãi đậu xe", icon: Car },
  { id: "breakfast", name: "Bữa sáng", icon: Coffee },
  { id: "pool", name: "Hồ bơi", icon: Waves },
  { id: "gym", name: "Phòng gym", icon: Dumbbell },
]

const propertyTypes = ["Khách sạn", "Resort", "Căn hộ", "Villa", "Homestay", "Hostel"]

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: [0, 10000000],
    rating: 0,
    propertyTypes: [],
    amenities: [],
    sortBy: "recommended",
  })

  const [activeFilters, setActiveFilters] = useState([])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const addActiveFilter = (type: string, value: string) => {
    const newFilter = { type, value, id: Date.now() }
    setActiveFilters((prev) => [...prev, newFilter])
  }

  const removeActiveFilter = (id: number) => {
    setActiveFilters((prev) => prev.filter((filter) => filter.id !== id))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setFilters({
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      priceRange: [0, 10000000],
      rating: 0,
      propertyTypes: [],
      amenities: [],
      sortBy: "recommended",
    })
  }

  return (
    <div className="w-full">
      {/* Main Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700">Điểm đến</Label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Bạn muốn đến đâu?"
                className="pl-10"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Nhận phòng</Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                className="pl-10"
                value={filters.checkIn}
                onChange={(e) => handleFilterChange("checkIn", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Trả phòng</Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                className="pl-10"
                value={filters.checkOut}
                onChange={(e) => handleFilterChange("checkOut", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Khách</Label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Select
                value={filters.guests.toString()}
                onValueChange={(value) => handleFilterChange("guests", Number.parseInt(value))}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} khách
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end space-x-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="px-3">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="flex items-center gap-1">
              {filter.value}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter(filter.id)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Xóa tất cả
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Khoảng giá (₫)</Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  max={10000000}
                  step={100000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.priceRange[0].toLocaleString()} ₫</span>
                  <span>{filters.priceRange[1].toLocaleString()} ₫</span>
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Xếp hạng sao</Label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.rating === rating}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange("rating", rating)
                            addActiveFilter("rating", `${rating} sao trở lên`)
                          }
                        }}
                      />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-1 text-sm">trở lên</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Types */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Loại chỗ nghỉ</Label>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.propertyTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange("propertyTypes", [...filters.propertyTypes, type])
                            addActiveFilter("propertyType", type)
                          } else {
                            handleFilterChange(
                              "propertyTypes",
                              filters.propertyTypes.filter((t) => t !== type),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Tiện nghi</Label>
                <div className="space-y-2">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity.id}`}
                        checked={filters.amenities.includes(amenity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange("amenities", [...filters.amenities, amenity.id])
                            addActiveFilter("amenity", amenity.name)
                          } else {
                            handleFilterChange(
                              "amenities",
                              filters.amenities.filter((a) => a !== amenity.id),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={`amenity-${amenity.id}`} className="flex items-center cursor-pointer text-sm">
                        <amenity.icon className="h-4 w-4 mr-2" />
                        {amenity.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Sắp xếp theo</Label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Đề xuất</SelectItem>
                    <SelectItem value="price-low">Giá thấp nhất</SelectItem>
                    <SelectItem value="price-high">Giá cao nhất</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="distance">Khoảng cách</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setIsOpen(false)}>Áp dụng bộ lọc</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
