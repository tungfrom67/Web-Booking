"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Star, Wifi, Coffee, Utensils, Car, DumbbellIcon, Waves } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Hotel } from "@/types/hotel"
import type { JSX } from "react"

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  const amenityIcons: Record<string, JSX.Element> = {
    "Wifi miễn phí": <Wifi className="h-4 w-4" />,
    "Bữa sáng": <Coffee className="h-4 w-4" />,
    "Nhà hàng": <Utensils className="h-4 w-4" />,
    "Bãi đậu xe": <Car className="h-4 w-4" />,
    "Phòng gym": <DumbbellIcon className="h-4 w-4" />,
    "Hồ bơi": <Waves className="h-4 w-4" />,
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/hotels/${hotel.id}`} className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
          <div className="absolute top-2 left-2">
            <Badge
              className={`${hotel.type === "resort" ? "bg-blue-600" : hotel.type === "hotel" ? "bg-purple-600" : "bg-green-600"}`}
            >
              {hotel.type === "resort" ? "Resort" : hotel.type === "hotel" ? "Khách sạn" : "Căn hộ"}
            </Badge>
          </div>
          {hotel.discount > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-500">-{hotel.discount}%</Badge>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold">{hotel.name}</h2>
              <p className="text-gray-600 flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {hotel.address}
              </p>
            </div>
            <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
              <span className="font-bold mr-1">{hotel.rating}</span>
              <Star className="h-4 w-4 fill-blue-800" />
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{hotel.shortDescription}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <div key={amenity} className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                {amenityIcons[amenity] && <span className="mr-1">{amenityIcons[amenity]}</span>}
                <span>{amenity}</span>
              </div>
            ))}
            {hotel.amenities.length > 4 && (
              <div className="bg-gray-100 px-2 py-1 rounded text-sm">+{hotel.amenities.length - 4} tiện nghi khác</div>
            )}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-blue-600">{formatPrice(hotel.priceRange.min)}</span>
                <span className="text-gray-500 ml-1">/đêm</span>
              </div>
              {hotel.discount > 0 && (
                <span className="text-gray-500 text-sm line-through">
                  {formatPrice(hotel.priceRange.min * (1 + hotel.discount / 100))}
                </span>
              )}
            </div>

            <Button className="mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700">Xem chi tiết</Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
