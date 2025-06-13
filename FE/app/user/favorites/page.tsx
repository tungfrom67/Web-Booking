"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MapPin, Star, Share2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Khách sạn Luxury Palace",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      rating: 4.8,
      reviewCount: 1234,
      priceFrom: 1500000,
      image: "/placeholder.svg?height=200&width=300",
      addedDate: "2024-01-15",
      category: "luxury",
      amenities: ["Hồ bơi", "Spa", "Nhà hàng", "Wifi miễn phí"],
    },
    {
      id: "2",
      name: "Resort Biển Xanh",
      address: "456 Đường Biển, Nha Trang",
      rating: 4.6,
      reviewCount: 856,
      priceFrom: 2000000,
      image: "/placeholder.svg?height=200&width=300",
      addedDate: "2024-01-20",
      category: "resort",
      amenities: ["Bãi biển riêng", "Hồ bơi", "Spa", "Bar"],
    },
    {
      id: "3",
      name: "Khách sạn Business Center",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      rating: 4.4,
      reviewCount: 567,
      priceFrom: 800000,
      image: "/placeholder.svg?height=200&width=300",
      addedDate: "2024-02-01",
      category: "business",
      amenities: ["Phòng họp", "Wifi miễn phí", "Bãi đậu xe"],
    },
    {
      id: "4",
      name: "Villa Đà Lạt",
      address: "321 Đường Hoa, Đà Lạt",
      rating: 4.9,
      reviewCount: 234,
      priceFrom: 1200000,
      image: "/placeholder.svg?height=200&width=300",
      addedDate: "2024-02-10",
      category: "villa",
      amenities: ["Vườn riêng", "BBQ", "Bếp", "Wifi miễn phí"],
    },
  ])

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  const filteredFavorites = favorites.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "rating":
        return b.rating - a.rating
      case "price":
        return a.priceFrom - b.priceFrom
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Khách sạn yêu thích</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {favorites.length} khách sạn
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm khách sạn yêu thích..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mới nhất</SelectItem>
            <SelectItem value="name">Tên A-Z</SelectItem>
            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
            <SelectItem value="price">Giá thấp nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Favorites Grid */}
      {sortedFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFavorites.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFavorite(hotel.id)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
                <Badge
                  className="absolute top-2 left-2"
                  variant={hotel.category === "luxury" ? "default" : "secondary"}
                >
                  {hotel.category === "luxury"
                    ? "Cao cấp"
                    : hotel.category === "resort"
                      ? "Resort"
                      : hotel.category === "business"
                        ? "Doanh nhân"
                        : "Villa"}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg line-clamp-1">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <MapPin size={14} />
                      {hotel.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hotel.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({hotel.reviewCount} đánh giá)</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Từ</p>
                      <p className="text-lg font-bold text-blue-600">{hotel.priceFrom.toLocaleString("vi-VN")}đ</p>
                      <p className="text-xs text-gray-500">mỗi đêm</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Share2 size={16} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Calendar size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/hotels/${hotel.id}`}>Xem chi tiết</Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Đặt ngay
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Đã thêm vào {new Date(hotel.addedDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm ? "Không tìm thấy khách sạn" : "Chưa có khách sạn yêu thích"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Thử tìm kiếm với từ khóa khác" : "Hãy khám phá và thêm những khách sạn yêu thích của bạn!"}
            </p>
            {!searchTerm && (
              <Button asChild>
                <Link href="/search">Tìm kiếm khách sạn</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
