"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Hotel, Home, Building, Palmtree, Castle } from "lucide-react"
import Link from "next/link"

type PropertyType = {
  id: string
  name: string
  icon: React.ReactNode
  link: string
}

const propertyTypes: PropertyType[] = [
  {
    id: "hotel",
    name: "Khách sạn",
    icon: <Hotel className="h-6 w-6" />,
    link: "/destinations/da-nang?type=hotel",
  },
  {
    id: "apartment",
    name: "Căn hộ",
    icon: <Building className="h-6 w-6" />,
    link: "/destinations/da-nang?type=apartment",
  },
  {
    id: "resort",
    name: "Resort",
    icon: <Palmtree className="h-6 w-6" />,
    link: "/destinations/da-nang?type=resort",
  },
  {
    id: "villa",
    name: "Biệt thự",
    icon: <Castle className="h-6 w-6" />,
    link: "/destinations/da-nang?type=villa",
  },
  {
    id: "homestay",
    name: "Homestay",
    icon: <Home className="h-6 w-6" />,
    link: "/destinations/da-nang?type=homestay",
  },
]

export function PropertyTypeFilter() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleTypeClick = (typeId: string) => {
    setSelectedType(typeId === selectedType ? null : typeId)
  }

  return (
    <div className="py-6">
      <h3 className="text-lg font-medium mb-4">Tìm theo loại chỗ nghỉ</h3>
      <div className="flex flex-wrap gap-4">
        {propertyTypes.map((type) => (
          <Link href={type.link} key={type.id} className="block">
            <motion.div
              className={`relative flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all ${
                selectedType === type.id
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-white border-2 border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleTypeClick(type.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`p-3 rounded-full mb-2 ${
                  selectedType === type.id ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-500"
                }`}
              >
                {type.icon}
              </div>
              <span className="text-sm font-medium">{type.name}</span>
              {selectedType === type.id && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
