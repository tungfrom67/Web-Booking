"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Users, Check, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Room } from "@/types/room"

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  const [expanded, setExpanded] = useState(false)

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
      layout
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
          {room.discount > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-500">-{room.discount}%</Badge>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold">{room.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Users className="h-4 w-4 mr-1" />
                <span>Tối đa {room.maxOccupancy} người</span>
                {room.size && (
                  <>
                    <span className="mx-2">•</span>
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span>{room.size} m²</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-blue-600">{formatPrice(room.price)}</span>
              <span className="text-gray-500 ml-1">/đêm</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
            {room.features.slice(0, 6).map((feature) => (
              <div key={feature} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <div>
              {room.discount > 0 && (
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm line-through mr-2">
                    {formatPrice(room.price * (1 + room.discount / 100))}
                  </span>
                  <Badge className="bg-red-500">Tiết kiệm {formatPrice((room.price * room.discount) / 100)}</Badge>
                </div>
              )}
            </div>

            <Button className="mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700">Đặt ngay</Button>
          </div>

          <div className="mt-4 pt-2 border-t border-gray-200">
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Ẩn chi tiết
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Xem thêm chi tiết
                </>
              )}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Tiện nghi phòng</h3>
                      <ul className="space-y-1">
                        {room.amenities.map((amenity) => (
                          <li key={amenity} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Chính sách phòng</h3>
                      <ul className="space-y-1">
                        {room.policies.map((policy, index) => (
                          <li key={index} className="flex items-start text-sm">
                            {policy.allowed ? (
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            )}
                            {policy.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Mô tả phòng</h3>
                    <p className="text-gray-700 text-sm">{room.description}</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {room.images.slice(1).map((image, index) => (
                      <div key={index} className="relative h-24 rounded overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${room.name} - Ảnh ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
