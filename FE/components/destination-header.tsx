"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Destination } from "@/types/destination"

interface DestinationHeaderProps {
  destination: Destination
}

export function DestinationHeader({ destination }: DestinationHeaderProps) {
  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
      <Image
        src={destination.image || "/placeholder.svg"}
        alt={destination.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
        <p className="text-xl md:text-2xl max-w-2xl">{destination.description}</p>
        <div className="flex items-center mt-4">
          <MapPin className="h-5 w-5 mr-1" />
          <span>{destination.region}, Việt Nam</span>
        </div>
      </motion.div>
    </div>
  )
}
