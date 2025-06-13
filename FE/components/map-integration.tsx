"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Navigation, Layers } from "lucide-react"

// Mock hotel data with coordinates
const hotelsOnMap = [
  {
    id: 1,
    name: "Vinpearl Luxury Nha Trang",
    lat: 12.2388,
    lng: 109.1967,
    price: 4500000,
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=150",
    type: "resort",
  },
  {
    id: 2,
    name: "JW Marriott Hanoi",
    lat: 21.0285,
    lng: 105.8542,
    price: 3200000,
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=150",
    type: "hotel",
  },
  {
    id: 3,
    name: "InterContinental Saigon",
    lat: 10.7769,
    lng: 106.7009,
    price: 5100000,
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=150",
    type: "hotel",
  },
]

export function MapIntegration() {
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [mapView, setMapView] = useState("satellite") // satellite, roadmap, hybrid
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Error getting location:", error)
        },
      )
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Container */}
      <div className="lg:col-span-2 relative">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Bản đồ khách sạn
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={mapView === "roadmap" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("roadmap")}
                >
                  Đường phố
                </Button>
                <Button
                  variant={mapView === "satellite" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("satellite")}
                >
                  <Layers className="h-4 w-4 mr-1" />
                  Vệ tinh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-80px)]">
            {/* Map placeholder - In real implementation, use Google Maps or Mapbox */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative rounded-b-lg overflow-hidden">
              {/* Mock map background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[url('/placeholder.svg?height=600&width=800&text=Map')] bg-cover bg-center" />
              </div>

              {/* Hotel markers */}
              {hotelsOnMap.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                  }}
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <div className={`relative ${selectedHotel?.id === hotel.id ? "z-20" : "z-10"}`}>
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm ${
                        hotel.type === "resort" ? "bg-purple-500" : "bg-blue-500"
                      } ${selectedHotel?.id === hotel.id ? "scale-125" : "hover:scale-110"} transition-transform`}
                    >
                      {formatPrice(hotel.price).slice(0, 1)}
                    </div>

                    {/* Price popup */}
                    <div
                      className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-2 py-1 text-xs font-medium whitespace-nowrap ${
                        selectedHotel?.id === hotel.id ? "block" : "hidden"
                      }`}
                    >
                      {formatPrice(hotel.price)}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                    </div>
                  </div>
                </div>
              ))}

              {/* User location marker */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                  style={{ left: "50%", top: "50%" }}
                >
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded px-2 py-1 text-xs whitespace-nowrap">
                    Vị trí của bạn
                  </div>
                </div>
              )}

              {/* Map controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                  +
                </Button>
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                  -
                </Button>
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hotel List */}
      <div className="space-y-4 overflow-y-auto">
        <h3 className="font-semibold text-lg">Khách sạn gần đây</h3>
        {hotelsOnMap.map((hotel) => (
          <Card
            key={hotel.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedHotel?.id === hotel.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedHotel(hotel)}
          >
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <img
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{hotel.name}</h4>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600 ml-1">{hotel.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={hotel.type === "resort" ? "default" : "secondary"} className="text-xs">
                      {hotel.type === "resort" ? "Resort" : "Khách sạn"}
                    </Badge>
                    <span className="text-sm font-semibold text-blue-600">{formatPrice(hotel.price)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
