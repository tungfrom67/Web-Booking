"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, MapPin, Users, Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { hotelsData } from "@/data/hotels"

// Lấy các phòng nổi bật từ các khách sạn khác nhau
const getFeaturedRooms = () => {
  const featuredRooms = []

  // Lấy tối đa 2 phòng từ mỗi khách sạn
  for (const hotel of hotelsData.slice(0, 3)) {
    if (hotel.rooms && hotel.rooms.length > 0) {
      for (const room of hotel.rooms.slice(0, 1)) {
        featuredRooms.push({
          id: room.id,
          hotelId: hotel.id,
          name: room.name,
          hotelName: hotel.name,
          location: hotel.destination,
          address: hotel.address,
          image: room.images[0] || "/placeholder.svg",
          price: room.price,
          discount: room.discount,
          rating: hotel.rating,
          maxOccupancy: room.maxOccupancy,
          bedType: room.bedType,
          features: room.features.slice(0, 3),
        })
      }
    }
  }

  return featuredRooms
}

export function FeaturedRooms() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const featuredRooms = getFeaturedRooms()

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredRooms.map((room) => (
        <motion.div
          key={room.id}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <Link href={`/hotels/${room.hotelId}`} className="block">
            <div className="relative">
              <div className="relative h-48 w-full">
                <Image
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <button
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors z-10"
                onClick={(e) => toggleFavorite(room.id, e)}
                aria-label={favorites[room.id] ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-5 w-5 ${favorites[room.id] ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center text-white">
                  <div className="flex">
                    {Array.from({ length: Math.floor(room.rating) }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-1 text-sm">{room.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.hotelName}</p>
                </div>
                <Badge className="bg-blue-600">{room.bedType.split(" ")[0]}</Badge>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{room.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {room.features.map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Users className="h-4 w-4 mr-1" />
                <span>Tối đa {room.maxOccupancy} người</span>
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>Có sẵn</span>
              </div>

              <div className="flex justify-between items-end mt-4">
                <div>
                  {room.discount > 0 && (
                    <div className="flex items-center">
                      <span className="text-gray-500 line-through text-sm mr-2">
                        {formatPrice(room.price * (1 + room.discount / 100))}
                      </span>
                      <Badge className="bg-red-500">-{room.discount}%</Badge>
                    </div>
                  )}
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(room.price * (1 - room.discount / 100))}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/đêm</span>
                  </div>
                </div>

                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <span className="mr-1">Đặt ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
