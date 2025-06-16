"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Users, ChevronLeft, Check, Info, Shield } from "lucide-react"
import { hotelsData } from "@/data/hotels"
import { format, addDays, differenceInDays } from "date-fns"
import { vi } from "date-fns/locale"
import { PaymentProcessor } from "@/components/payment-processor"
import { BookingSummary } from "@/components/booking-summary"

export default function BookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const hotelId = params.id as string

  const [hotel, setHotel] = useState<any>(null)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeTerms: false,
  })

  // Parse search params
  const checkInParam = searchParams.get("checkIn")
  const checkOutParam = searchParams.get("checkOut")
  const adultsParam = searchParams.get("adults")
  const childrenParam = searchParams.get("children")

  const [bookingDetails, setBookingDetails] = useState({
    checkIn: checkInParam ? new Date(checkInParam) : new Date(),
    checkOut: checkOutParam ? new Date(checkOutParam) : addDays(new Date(), 2),
    adults: adultsParam ? Number.parseInt(adultsParam) : 2,
    children: childrenParam ? Number.parseInt(childrenParam) : 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundHotel = hotelsData.find((h) => h.id === hotelId)
      setHotel(foundHotel)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [hotelId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy khách sạn</h1>
        <p className="text-gray-600 mb-6">Khách sạn bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
          Quay lại trang chủ
        </Button>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId)
    setActiveStep(2)
  }

  const handleSubmitCustomerInfo = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep(3)
  }

  const calculateNights = () => {
    return differenceInDays(bookingDetails.checkOut, bookingDetails.checkIn)
  }

  const nights = calculateNights()
  const selectedRoomData = hotel.rooms.find((room: any) => room.id === selectedRoom)
  const roomPrice = selectedRoomData ? selectedRoomData.price : 0
  const discount = selectedRoomData ? selectedRoomData.discount : 0
  const discountedPrice = roomPrice * (1 - discount / 100)
  const totalPrice = discountedPrice * nights

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Button variant="ghost" className="mb-6 flex items-center" onClick={() => router.push(`/hotels/${hotelId}`)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Quay lại thông tin khách sạn
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2">Đặt phòng tại {hotel.name}</h1>
              <p className="text-gray-600 mb-4">
                {hotel.address}, {hotel.destination}
              </p>

              <div className="flex flex-wrap gap-4 p-4 bg-blue-50 rounded-lg mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Nhận phòng</p>
                    <p className="font-medium">{format(bookingDetails.checkIn, "dd/MM/yyyy", { locale: vi })}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Trả phòng</p>
                    <p className="font-medium">{format(bookingDetails.checkOut, "dd/MM/yyyy", { locale: vi })}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Thời gian lưu trú</p>
                    <p className="font-medium">{nights} đêm</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Khách</p>
                    <p className="font-medium">
                      {bookingDetails.adults} người lớn, {bookingDetails.children} trẻ em
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <Tabs value={`step-${activeStep}`}>
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger
                      value="step-1"
                      disabled={activeStep !== 1}
                      className={activeStep >= 1 ? "text-blue-600" : ""}
                    >
                      1. Chọn phòng
                    </TabsTrigger>
                    <TabsTrigger
                      value="step-2"
                      disabled={activeStep !== 2}
                      className={activeStep >= 2 ? "text-blue-600" : ""}
                    >
                      2. Chi tiết của bạn
                    </TabsTrigger>
                    <TabsTrigger
                      value="step-3"
                      disabled={activeStep !== 3}
                      className={activeStep >= 3 ? "text-blue-600" : ""}
                    >
                      3. Thanh toán
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="step-1" className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Chọn loại phòng</h2>
                    <div className="space-y-6">
                      {hotel.rooms.map((room: any) => (
                        <Card
                          key={room.id}
                          className={`overflow-hidden ${selectedRoom === room.id ? "ring-2 ring-blue-500" : ""}`}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 relative h-48 md:h-auto">
                              <Image
                                src={room.images[0] || "/placeholder.svg"}
                                alt={room.name}
                                fill
                                className="object-cover"
                              />
                              {room.discount > 0 && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-red-500">-{room.discount}%</Badge>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-lg font-bold">{room.name}</h3>
                                  <div className="flex items-center text-gray-600 mt-1">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span>Tối đa {room.maxOccupancy} người</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  {room.discount > 0 && (
                                    <span className="text-gray-500 line-through text-sm">
                                      {formatPrice(room.price)}
                                    </span>
                                  )}
                                  <span className="text-xl font-bold text-blue-600">
                                    {formatPrice(room.price * (1 - room.discount / 100))}
                                  </span>
                                  <span className="text-gray-500 text-sm">/đêm</span>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
                                {room.features.slice(0, 6).map((feature: string) => (
                                  <div key={feature} className="flex items-center text-sm">
                                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-auto">
                                <Button
                                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                                  onClick={() => handleRoomSelect(room.id)}
                                >
                                  Chọn phòng này
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="step-2" className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Chi tiết của bạn</h2>
                    <form onSubmit={handleSubmitCustomerInfo}>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Thông tin quan trọng</p>
                            <p className="text-sm text-gray-700">
                              Vui lòng nhập thông tin chính xác của người sẽ nhận phòng. Bạn sẽ cần xuất trình giấy tờ
                              tùy thân khi nhận phòng.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <Label htmlFor="firstName">Họ</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Tên</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Xác nhận đặt phòng sẽ được gửi đến địa chỉ email này
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                          <p className="text-xs text-gray-500 mt-1">
                            Khách sạn có thể liên hệ với bạn qua số điện thoại này
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <Label htmlFor="specialRequests">Yêu cầu đặc biệt (không bắt buộc)</Label>
                        <Input
                          id="specialRequests"
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Yêu cầu đặc biệt không được đảm bảo - khách sạn sẽ cố gắng đáp ứng yêu cầu của bạn
                        </p>
                      </div>

                      <div className="flex items-start space-x-2 mb-6">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
                          required
                        />
                        <Label htmlFor="agreeTerms" className="text-sm font-normal">
                          Tôi xác nhận thông tin trên là chính xác và đồng ý với{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Điều khoản và Điều kiện
                          </a>{" "}
                          của khách sạn.
                        </Label>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setActiveStep(1)}>
                          Quay lại
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={!formData.agreeTerms}>
                          Tiếp tục đến thanh toán
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="step-3" className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Thanh toán an toàn</p>
                          <p className="text-sm text-gray-700">
                            Thông tin thanh toán của bạn được bảo mật với công nghệ mã hóa SSL 256-bit.
                          </p>
                        </div>
                      </div>
                    </div>

                    <PaymentProcessor
                      hotelId={hotelId}
                      roomId={selectedRoom || ""}
                      checkIn={bookingDetails.checkIn}
                      checkOut={bookingDetails.checkOut}
                      adults={bookingDetails.adults}
                      children={bookingDetails.children}
                      totalPrice={totalPrice}
                      customerData={formData}
                    />

                    <div className="flex justify-between mt-6">
                      <Button type="button" variant="outline" onClick={() => setActiveStep(2)}>
                        Quay lại
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <BookingSummary
                checkIn={bookingDetails.checkIn}
                checkOut={bookingDetails.checkOut}
                nights={nights}
                adults={bookingDetails.adults}
                children={bookingDetails.children}
                roomName={selectedRoomData?.name}
                bedType={selectedRoomData?.bedType}
                roomPrice={roomPrice}
                discount={discount}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
