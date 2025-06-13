"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Star, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DestinationHeader } from "@/components/destination-header"
import { HotelCard } from "@/components/hotel-card"
import { destinationsData } from "@/data/destinations"

export default function DestinationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const destinationId = params.id as string
  const typeParam = searchParams.get("type")

  const [activeTab, setActiveTab] = useState(typeParam || "all")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [sortOption, setSortOption] = useState("recommended")
  const [showFilters, setShowFilters] = useState(false)
  const [amenityFilters, setAmenityFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [destination, setDestination] = useState<any>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundDestination = destinationsData.find((dest) => dest.id === destinationId)
      setDestination(foundDestination)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [destinationId])

  useEffect(() => {
    if (typeParam) {
      setActiveTab(typeParam)
    }
  }, [typeParam])

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenityFilters([...amenityFilters, amenity])
    } else {
      setAmenityFilters(amenityFilters.filter((a) => a !== amenity))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!destination) {
    return <div className="p-8 text-center">Không tìm thấy điểm đến</div>
  }

  const filteredHotels = destination.hotels
    .filter((hotel: any) => {
      // Filter by type
      if (activeTab !== "all" && hotel.type !== activeTab) {
        return false
      }

      // Filter by price
      const hotelPrice = hotel.priceRange.min
      if (hotelPrice < priceRange[0] || hotelPrice > priceRange[1]) {
        return false
      }

      // Filter by amenities
      if (amenityFilters.length > 0) {
        return amenityFilters.every((amenity) => hotel.amenities.includes(amenity))
      }

      return true
    })
    .sort((a: any, b: any) => {
      // Sort by selected option
      switch (sortOption) {
        case "price-low":
          return a.priceRange.min - b.priceRange.min
        case "price-high":
          return b.priceRange.min - a.priceRange.min
        case "rating":
          return b.rating - a.rating
        default:
          return 0 // recommended
      }
    })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationHeader destination={destination} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <motion.div
            className={`w-full md:w-64 bg-white rounded-lg shadow-md p-4 ${
              showFilters ? "block" : "hidden md:block"
            } md:sticky md:top-20 md:h-fit`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Bộ lọc</h3>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Khoảng giá</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 10000000]}
                  max={10000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Tiện nghi</h4>
              <div className="space-y-2">
                {["Hồ bơi", "Wifi miễn phí", "Bãi đậu xe", "Nhà hàng", "Phòng gym", "Spa"].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={amenityFilters.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked === true)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Xếp hạng</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {rating === 5 && <span className="ml-1">trở lên</span>}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full md:hidden mt-4" variant="outline" onClick={() => setShowFilters(false)}>
              Áp dụng bộ lọc
            </Button>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{destination.name}</h1>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.hotels.length} chỗ nghỉ tại {destination.name}
                </p>
              </div>

              <div className="flex mt-4 sm:mt-0">
                <Button variant="outline" className="mr-2 md:hidden" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
                <div className="relative">
                  <Button variant="outline" className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <select
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="recommended">Đề xuất</option>
                      <option value="price-low">Giá (thấp - cao)</option>
                      <option value="price-high">Giá (cao - thấp)</option>
                      <option value="rating">Xếp hạng</option>
                    </select>
                    {sortOption === "recommended" && "Đề xuất"}
                    {sortOption === "price-low" && "Giá (thấp - cao)"}
                    {sortOption === "price-high" && "Giá (cao - thấp)"}
                    {sortOption === "rating" && "Xếp hạng"}
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue={activeTab} className="mb-6" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="hotel">Khách sạn</TabsTrigger>
                <TabsTrigger value="resort">Resort</TabsTrigger>
                <TabsTrigger value="apartment">Căn hộ</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-6">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel: any) => <HotelCard key={hotel.id} hotel={hotel} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Không tìm thấy kết quả phù hợp với bộ lọc của bạn</p>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      setActiveTab("all")
                      setPriceRange([0, 10000000])
                      setAmenityFilters([])
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
