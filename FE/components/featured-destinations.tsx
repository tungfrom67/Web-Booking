"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const destinations = [
  {
    id: "ha-noi",
    name: "Hà Nội",
    image: "/placeholder.svg?height=300&width=400",
    properties: 1245,
  },
  {
    id: "ho-chi-minh",
    name: "TP. Hồ Chí Minh",
    image: "/placeholder.svg?height=300&width=400",
    properties: 2356,
  },
  {
    id: "da-nang",
    name: "Đà Nẵng",
    image: "/placeholder.svg?height=300&width=400",
    properties: 987,
  },
  {
    id: "nha-trang",
    name: "Nha Trang",
    image: "/placeholder.svg?height=300&width=400",
    properties: 765,
  },
  {
    id: "phu-quoc",
    name: "Phú Quốc",
    image: "/placeholder.svg?height=300&width=400",
    properties: 543,
  },
  {
    id: "da-lat",
    name: "Đà Lạt",
    image: "/placeholder.svg?height=300&width=400",
    properties: 678,
  },
]

export function FeaturedDestinations() {
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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {destinations.map((destination) => (
        <motion.div key={destination.id} variants={item} whileHover={{ y: -10 }}>
          <Link href={`/destinations/${destination.id}`} className="block">
            <div className="relative rounded-xl overflow-hidden h-64 shadow-lg transition-all duration-300 hover:shadow-xl">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                <p className="flex items-center">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                    {destination.properties}
                  </span>
                  chỗ nghỉ
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
