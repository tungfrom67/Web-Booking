"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, MapPin, X, Plus, Check, Minus } from "lucide-react"

const sampleHotels = [
  {
    id: 1,
    name: "Vinpearl Luxury Nha Trang",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    location: "Nha Trang",
    price: 4500000,
    amenities: ["wifi", "parking", "breakfast", "pool", "gym", "spa"],
    features: {
      "Wifi miễn phí": true,
      "Bãi đậu xe": true,
      "Bữa sáng": true,
      "Hồ bơi": true,
      "Phòng gym": true,
      Spa: true,
      "Nhà hàng": true,
      "Dịch vụ phòng 24/7": true,
      "Trung tâm thương mại": false,
      "Sân golf": false,
    },
  },
  {
    id: 2,
    name: "JW Marriott Hanoi",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    location: "Hà Nội",
    price: 3200000,
    amenities: ["wifi", "parking", "breakfast", "gym"],
    features: {
      "Wifi miễn phí": true,
      "Bãi đậu xe": true,
      "Bữa sáng": true,
      "Hồ bơi": false,
      "Phòng gym": true,
      Spa: true,
      "Nhà hàng": true,
      "Dịch vụ phòng 24/7": true,
      "Trung tâm thương mại": true,
      "Sân golf": false,
    },
  },
  {
    id: 3,
    name: "InterContinental Saigon",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    location: "TP.HCM",
    price: 5100000,
    amenities: ["wifi", "parking", "breakfast", "pool", "gym"],
    features: {
      "Wifi miễn phí": true,
      "Bãi đậu xe": true,
      "Bữa sáng": true,
      "Hồ bơi": true,
      "Phòng gym": true,
      Spa: false,
      "Nhà hàng": true,
      "Dịch vụ phòng 24/7": true,
      "Trung tâm thương mại": true,
      "Sân golf": true,
    },
  },
]

export function ComparisonFeature() {
  const [selectedHotels, setSelectedHotels] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  const toggleHotelSelection = (hotel) => {
    setSelectedHotels((prev) => {
      const isSelected = prev.find((h) => h.id === hotel.id)
      if (isSelected) {
        return prev.filter((h) => h.id !== hotel.id)
      } else if (prev.length < 3) {
        return [...prev, hotel]
      }
      return prev
    })
  }

  const removeHotel = (hotelId) => {
    setSelectedHotels((prev) => prev.filter((h) => h.id !== hotelId))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const allFeatures = Object.keys(sampleHotels[0].features)

  return (
    <div className="space-y-6">
      {/* Hotel Selection */}
      {!showComparison && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Chọn khách sạn để so sánh</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Đã chọn: {selectedHotels.length}/3</span>
              {selectedHotels.length >= 2 && <Button onClick={() => setShowComparison(true)}>So sánh ngay</Button>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleHotels.map((hotel) => {
              const isSelected = selectedHotels.find((h) => h.id === hotel.id)
              return (
                <Card
                  key={hotel.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <Checkbox
                          checked={!!isSelected}
                          onCheckedChange={() => toggleHotelSelection(hotel)}
                          disabled={!isSelected && selectedHotels.length >= 3}
                          className="bg-white"
                        />
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-blue-600">
                          <Star className="h-3 w-3 mr-1 fill-white" />
                          {hotel.rating}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">{formatPrice(hotel.price)}</span>
                        <Button
                          variant={isSelected ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => toggleHotelSelection(hotel)}
                          disabled={!isSelected && selectedHotels.length >= 3}
                        >
                          {isSelected ? (
                            <>
                              <Minus className="h-4 w-4 mr-1" />
                              Bỏ chọn
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              So sánh
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {showComparison && selectedHotels.length >= 2 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">So sánh khách sạn</h2>
            <Button variant="outline" onClick={() => setShowComparison(false)}>
              <X className="h-4 w-4 mr-2" />
              Đóng so sánh
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 w-48">Tiêu chí</th>
                      {selectedHotels.map((hotel) => (
                        <th key={hotel.id} className="text-center p-4 min-w-64">
                          <div className="space-y-3">
                            <div className="relative">
                              <img
                                src={hotel.image || "/placeholder.svg"}
                                alt={hotel.name}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 w-6 h-6 p-0"
                                onClick={() => removeHotel(hotel.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <div>
                              <h3 className="font-semibold">{hotel.name}</h3>
                              <div className="flex items-center justify-center mt-1">
                                <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-sm text-gray-600">{hotel.location}</span>
                              </div>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">Giá phòng/đêm</td>
                      {selectedHotels.map((hotel) => (
                        <td key={hotel.id} className="p-4 text-center">
                          <span className="text-lg font-bold text-blue-600">{formatPrice(hotel.price)}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Rating */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">Đánh giá</td>
                      {selectedHotels.map((hotel) => (
                        <td key={hotel.id} className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-semibold">{hotel.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Features */}
                    {allFeatures.map((feature) => (
                      <tr key={feature} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{feature}</td>
                        {selectedHotels.map((hotel) => (
                          <td key={hotel.id} className="p-4 text-center">
                            {hotel.features[feature] ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Action buttons */}
                    <tr>
                      <td className="p-4 font-medium">Hành động</td>
                      {selectedHotels.map((hotel) => (
                        <td key={hotel.id} className="p-4 text-center">
                          <div className="space-y-2">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Đặt ngay</Button>
                            <Button variant="outline" className="w-full">
                              Xem chi tiết
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
