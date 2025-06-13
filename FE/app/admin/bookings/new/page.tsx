"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Search, User, Hotel, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export default function NewBookingPage() {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [step, setStep] = useState(1)

  const steps = [
    { id: 1, title: "Thông tin khách hàng", icon: User },
    { id: 2, title: "Chọn phòng", icon: Hotel },
    { id: 3, title: "Thanh toán", icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Tạo đặt phòng mới
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Tạo đặt phòng mới cho khách hàng
        </motion.p>
      </div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center space-x-8"
      >
        {steps.map((stepItem, index) => (
          <div key={stepItem.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= stepItem.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <stepItem.icon className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${step >= stepItem.id ? "text-blue-600" : "text-gray-500"}`}>
                Bước {stepItem.id}
              </p>
              <p className="text-xs text-gray-500">{stepItem.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${step > stepItem.id ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </motion.div>

      {/* Step Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
              <CardDescription>Nhập thông tin khách hàng đặt phòng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Họ và tên *</Label>
                  <Input id="customerName" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input id="customerEmail" type="email" placeholder="nguyenvana@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Số điện thoại *</Label>
                  <Input id="customerPhone" placeholder="+84 901 234 567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerAddress">Địa chỉ</Label>
                  <Input id="customerAddress" placeholder="123 Đường ABC, Quận 1, TP.HCM" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Ngày nhận phòng *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Ngày trả phòng *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Số khách</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn số khách" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 khách</SelectItem>
                      <SelectItem value="2">2 khách</SelectItem>
                      <SelectItem value="3">3 khách</SelectItem>
                      <SelectItem value="4">4 khách</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">Yêu cầu đặc biệt</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Nhập yêu cầu đặc biệt (nếu có)..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700">
                  Tiếp tục
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Chọn phòng</CardTitle>
              <CardDescription>Chọn phòng phù hợp cho khách hàng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search and Filter */}
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Tìm kiếm khách sạn..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Loại phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Available Rooms */}
              <div className="grid gap-4">
                {[
                  {
                    hotel: "Grand Palace Hotel",
                    room: "Deluxe Suite",
                    price: "2,500,000 ₫",
                    available: 3,
                    amenities: ["WiFi", "TV", "Minibar", "Balcony"],
                  },
                  {
                    hotel: "Ocean View Resort",
                    room: "Ocean View Room",
                    price: "3,200,000 ₫",
                    available: 2,
                    amenities: ["WiFi", "TV", "Sea View", "Spa"],
                  },
                  {
                    hotel: "Mountain Lodge",
                    room: "Standard Room",
                    price: "1,800,000 ₫",
                    available: 5,
                    amenities: ["WiFi", "TV", "Mountain View"],
                  },
                ].map((room, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{room.hotel}</h3>
                        <p className="text-gray-600">{room.room}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {room.amenities.map((amenity, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{room.available} phòng còn trống</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{room.price}</p>
                        <p className="text-sm text-gray-500">/ đêm</p>
                        <Button className="mt-2" size="sm">
                          Chọn phòng
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Quay lại
                </Button>
                <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700">
                  Tiếp tục
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Xác nhận và thanh toán</CardTitle>
              <CardDescription>Xem lại thông tin và xác nhận đặt phòng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-4">Tóm tắt đặt phòng</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Khách hàng:</span>
                    <span className="font-medium">Nguyễn Văn A</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Khách sạn:</span>
                    <span className="font-medium">Grand Palace Hotel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loại phòng:</span>
                    <span className="font-medium">Deluxe Suite</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thời gian:</span>
                    <span className="font-medium">15/01/2024 - 18/01/2024 (3 đêm)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số khách:</span>
                    <span className="font-medium">2 người</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng tiền:</span>
                    <span className="text-blue-600">7,500,000 ₫</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold">Phương thức thanh toán</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Tiền mặt</SelectItem>
                    <SelectItem value="card">Thẻ tín dụng</SelectItem>
                    <SelectItem value="transfer">Chuyển khoản</SelectItem>
                    <SelectItem value="vnpay">VNPay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Quay lại
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">Xác nhận đặt phòng</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
