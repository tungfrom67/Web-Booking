"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, CalendarIcon, Users, Search } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export function SearchBar() {
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  })
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)
  const [locationSuggestions] = useState([
    "Hà Nội, Việt Nam",
    "TP. Hồ Chí Minh, Việt Nam",
    "Đà Nẵng, Việt Nam",
    "Nha Trang, Khánh Hòa, Việt Nam",
    "Phú Quốc, Kiên Giang, Việt Nam",
  ])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = () => {
    console.log("Searching for:", { location, dateRange, guests })
    // Implement search functionality
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setLocation(suggestion)
    setShowSuggestions(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Bạn muốn đến đâu?"
            className="pl-10"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => setShowSuggestions(location.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && (
            <motion.div
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {locationSuggestions
                .filter((suggestion) => suggestion.toLowerCase().includes(location.toLowerCase()))
                .map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {suggestion}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </div>

        {/* Date Range */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from && dateRange.to ? (
                <span>
                  {format(dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                  {format(dateRange.to, "dd/MM/yyyy", { locale: vi })}
                </span>
              ) : (
                <span>Chọn ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                  }
                }}
                numberOfMonths={2}
                locale={vi}
              />
            </motion.div>
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <Users className="mr-2 h-4 w-4" />
              <span>
                {guests.adults} người lớn · {guests.children} trẻ em · {guests.rooms} phòng
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <span>Người lớn</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center">{guests.adults}</span>
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Trẻ em</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center">{guests.children}</span>
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Phòng</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() => setGuests({ ...guests, rooms: Math.max(1, guests.rooms - 1) })}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center">{guests.rooms}</span>
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() => setGuests({ ...guests, rooms: guests.rooms + 1 })}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <Button className="w-full" onClick={() => setIsGuestsOpen(false)}>
                Xác nhận
              </Button>
            </motion.div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Tìm kiếm
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
