"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, Users, Clock, Star, Download, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [cancelReason, setCancelReason] = useState("")

  const bookings = [
    {
      id: "BK001234",
      hotelName: "Khách sạn Luxury Palace",
      roomType: "Deluxe Room",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      guests: 2,
      nights: 3,
      totalAmount: 4500000,
      status: "confirmed",
      bookingDate: "2024-01-10",
      image: "/placeholder.svg?height=200&width=300",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      canCancel: true,
      canReview: false,
    },
    {
      id: "BK001235",
      hotelName: "Resort Biển Xanh",
      roomType: "Ocean View Suite",
      checkIn: "2024-02-20",
      checkOut: "2024-02-23",
      guests: 2,
      nights: 3,
      totalAmount: 6000000,
      status: "completed",
      bookingDate: "2024-02-15",
      image: "/placeholder.svg?height=200&width=300",
      address: "456 Đường Biển, Nha Trang",
      canCancel: false,
      canReview: true,
    },
    {
      id: "BK001236",
      hotelName: "Khách sạn Business Center",
      roomType: "Standard Room",
      checkIn: "2024-03-10",
      checkOut: "2024-03-12",
      guests: 1,
      nights: 2,
      totalAmount: 2000000,
      status: "cancelled",
      bookingDate: "2024-03-05",
      image: "/placeholder.svg?height=200&width=300",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      canCancel: false,
      canReview: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Đang xử lý</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Hoàn thành</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    console.log("Cancelling booking:", bookingId, "Reason:", cancelReason)
    // Implement cancel booking logic
    setCancelReason("")
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={booking.image || "/placeholder.svg"}
              alt={booking.hotelName}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{booking.hotelName}</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin size={16} />
                  {booking.address}
                </p>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Mã đặt phòng</p>
                <p className="font-medium">{booking.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loại phòng</p>
                <p className="font-medium">{booking.roomType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nhận phòng</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(booking.checkIn).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trả phòng</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(booking.checkOut).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users size={16} />
                  <span>{booking.guests} khách</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={16} />
                  <span>{booking.nights} đêm</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{booking.totalAmount.toLocaleString("vi-VN")}đ</p>
                <p className="text-sm text-gray-500">Tổng cộng</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-1" />
                Tải hóa đơn
              </Button>

              <Button variant="outline" size="sm">
                <MessageCircle size={16} className="mr-1" />
                Liên hệ khách sạn
              </Button>

              {booking.canReview && (
                <Button size="sm">
                  <Star size={16} className="mr-1" />
                  Viết đánh giá
                </Button>
              )}

              {booking.canCancel && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <X size={16} className="mr-1" />
                      Hủy đặt phòng
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hủy đặt phòng</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>
                        Bạn có chắc chắn muốn hủy đặt phòng <strong>{booking.id}</strong>?
                      </p>

                      <div className="space-y-2">
                        <Label htmlFor="cancelReason">Lý do hủy (không bắt buộc)</Label>
                        <Textarea
                          id="cancelReason"
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          placeholder="Nhập lý do hủy đặt phòng..."
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Không hủy</Button>
                        <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)}>
                          Xác nhận hủy
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Đặt phòng của tôi</h1>
        <Button asChild>
          <Link href="/search">Đặt phòng mới</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {bookings
            .filter((b) => b.status === "confirmed")
            .map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {bookings
            .filter((b) => b.status === "completed")
            .map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {bookings
            .filter((b) => b.status === "cancelled")
            .map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </TabsContent>
      </Tabs>

      {bookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Chưa có đặt phòng nào</h3>
            <p className="text-gray-600 mb-4">Bạn chưa có đặt phòng nào. Hãy khám phá và đặt phòng ngay!</p>
            <Button asChild>
              <Link href="/search">Tìm kiếm khách sạn</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
