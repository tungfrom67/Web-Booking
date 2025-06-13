"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Calendar, Users, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import Link from "next/link"

interface BookingWidgetProps {
  hotelId: string
  minPrice: number
  discount?: number
  maxGuests?: number
}

export function BookingWidget({ hotelId, minPrice, discount = 0, maxGuests = 4 }: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 2)),
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
  })
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₫", "đ")
  }

  const originalPrice = discount > 0 ? minPrice * (1 + discount / 100) : minPrice
  const discountedPrice = minPrice

  const calculateTotalNights = () => {
    if (!dateRange.from || !dateRange.to) return 1
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalNights = calculateTotalNights()
  const totalPrice = discountedPrice * totalNights

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-2">Đặt phòng</h2>
      <div className="mb-4">
        <p className="text-gray-600 text-sm">Giá chỉ từ</p>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-blue-600">{formatPrice(discountedPrice)}</span>
          <span className="text-gray-500 ml-1">/đêm</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center mt-1">
            <Badge className="bg-red-500 text-white mr-2">Giảm {discount}%</Badge>
            <span className="text-gray-500 line-through">{formatPrice(originalPrice)}</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {/* Date Selection */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal h-12 border border-gray-300 hover:border-blue-500"
            >
              <Calendar className="mr-2 h-4 w-4 text-blue-500" />
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
              <CalendarComponent
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from) {
                    setDateRange({
                      from: range.from,
                      to: range.to,
                    })
                  }
                }}
                numberOfMonths={2}
                locale={vi}
                disabled={{ before: new Date() }}
              />
            </motion.div>
          </PopoverContent>
        </Popover>

        {/* Guests Selection */}
        <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal h-12 border border-gray-300 hover:border-blue-500"
            >
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              <span>
                {guests.adults} người lớn, {guests.children} trẻ em
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
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
                    disabled={guests.adults <= 1}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center">{guests.adults}</span>
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        adults: Math.min(maxGuests - guests.children, guests.adults + 1),
                      })
                    }
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    disabled={guests.adults + guests.children >= maxGuests}
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
                    disabled={guests.children <= 0}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center">{guests.children}</span>
                  <motion.button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        children: Math.min(maxGuests - guests.adults, guests.children + 1),
                      })
                    }
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    disabled={guests.adults + guests.children >= maxGuests}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-500">Tối đa {maxGuests} khách</p>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsGuestsOpen(false)}>
                Xác nhận
              </Button>
            </motion.div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Price Summary */}
      <div className="space-y-2 mb-6 border-t border-b border-gray-200 py-4">
        <div className="flex justify-between">
          <span>
            {formatPrice(discountedPrice)} x {totalNights} đêm
          </span>
          <span>{formatPrice(discountedPrice * totalNights)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá</span>
            <span>-{formatPrice((originalPrice - discountedPrice) * totalNights)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
          <span>Tổng tiền</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>Đặt phòng nhanh chóng</span>
        </div>
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>Xác nhận đặt phòng ngay lập tức</span>
        </div>
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>Hủy miễn phí trước 3 ngày</span>
        </div>
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-blue-600 font-medium">Thanh toán an toàn qua cổng thanh toán bảo mật</span>
        </div>
      </div>

      <Link
        href={`/booking/${hotelId}?checkIn=${dateRange.from?.toISOString()}&checkOut=${dateRange.to?.toISOString()}&adults=${guests.adults}&children=${guests.children}`}
      >
        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium">
          <CreditCard className="mr-2 h-4 w-4" />
          Đặt ngay
        </Button>
      </Link>
      <p className="text-xs text-center text-gray-500 mt-2">Bạn chưa bị trừ tiền</p>
    </div>
  )
}
