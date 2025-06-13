"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const favoriteAccommodations = [
  {
    id: "vinpearl-nha-trang",
    name: "Vinpearl Resort & Spa Nha Trang",
    location: "Nha Trang, Khánh Hòa",
    image: "/placeholder.svg?height=300&width=500",
    type: "Resort",
    rating: 4.8,
    reviews: 1245,
    price: 2500000,
    discount: 15,
    isFavorite: false,
  },
  {
    id: "jw-marriott-hanoi",
    name: "JW Marriott Hotel Hanoi",
    location: "Hà Nội",
    image: "/placeholder.svg?height=300&width=500",
    type: "Khách sạn",
    rating: 4.9,
    reviews: 987,
    price: 3200000,
    discount: 10,
    isFavorite: false,
  },
  {
    id: "vinhomes-central-park",
    name: "Vinhomes Central Park Apartment",
    location: "TP. Hồ Chí Minh",
    image: "/placeholder.svg?height=300&width=500",
    type: "Căn hộ",
    rating: 4.7,
    reviews: 856,
    price: 1800000,
    discount: 0,
    isFavorite: false,
  },
  {
    id: "fusion-maia-danang",
    name: "Fusion Maia Đà Nẵng",
    location: "Đà Nẵng",
    image: "/placeholder.svg?height=300&width=500",
    type: "Resort",
    rating: 4.9,
    reviews: 1102,
    price: 4500000,
    discount: 20,
    isFavorite: false,
  },
]

export function FavoriteAccommodations() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    favoriteAccommodations.reduce((acc, item) => ({ ...acc, [item.id]: item.isFavorite }), {}),
  )

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault() // Prevent the link navigation when clicking the heart
    e.stopPropagation() // Stop event propagation
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {favoriteAccommodations.map((accommodation) => (
        <motion.div
          key={accommodation.id}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          variants={item}
          whileHover={{ y: -10 }}
        >
          <Link href={`/hotels/${accommodation.id}`} className="block">
            <div className="relative">
              <div className="relative h-48 w-full">
                <Image
                  src={accommodation.image || "/placeholder.svg"}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <button
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors z-10"
                onClick={(e) => toggleFavorite(accommodation.id, e)}
                aria-label={favorites[accommodation.id] ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`h-5 w-5 ${favorites[accommodation.id] ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Badge
                  className={`${accommodation.type === "Resort" ? "bg-blue-600" : accommodation.type === "Khách sạn" ? "bg-purple-600" : "bg-green-600"} hover:${accommodation.type === "Resort" ? "bg-blue-700" : accommodation.type === "Khách sạn" ? "bg-purple-700" : "bg-green-700"}`}
                >
                  {accommodation.type}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 line-clamp-1">{accommodation.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{accommodation.location}</p>
              <div className="flex items-center mb-3">
                <div className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                  <span className="font-bold mr-1">{accommodation.rating}</span>
                  <Star className="h-3 w-3 fill-white" />
                </div>
                <span className="text-sm text-gray-600">{accommodation.reviews} đánh giá</span>
              </div>
              <div className="flex items-baseline">
                {accommodation.discount > 0 && (
                  <>
                    <span className="text-gray-500 line-through text-sm mr-2">{formatPrice(accommodation.price)}</span>
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-md mr-2">
                      -{accommodation.discount}%
                    </span>
                  </>
                )}
                <span className="text-lg font-bold text-blue-700">
                  {formatPrice(accommodation.price * (1 - accommodation.discount / 100))}
                </span>
                <span className="text-gray-500 text-sm ml-1">/đêm</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
