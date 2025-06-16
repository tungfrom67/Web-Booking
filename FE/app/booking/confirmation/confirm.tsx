"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Download,
  Share2,
  Printer,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  CreditCard,
  AlertCircle,
  QrCode,
  Smartphone,
  Home,
} from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { vi } from "date-fns/locale"
import confetti from "canvas-confetti"
import { hotelsData } from "@/data/hotels"

export default function BookingConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showConfetti, setShowConfetti] = useState(true)
  const [hotel, setHotel] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Lấy thông tin từ URL params
  const bookingId = searchParams.get("bookingId") || "BK809694"
  const hotelId = searchParams.get("hotelId") || "vinpearl-nha-trang"
  const roomId = searchParams.get("roomId") || ""
  const checkInStr = searchParams.get("checkIn") || "2025-05-17"
  const checkOutStr = searchParams.get("checkOut") || "2025-05-19"
  const adults = Number(searchParams.get("adults") || "2")
  const children = Number(searchParams.get("children") || "0")
  const totalPrice = Number(searchParams.get("totalPrice") || "4250000")
  const customerName = searchParams.get("customerName") || "Nguyễn Văn A"
  const customerEmail = searchParams.get("customerEmail") || "admin2@gmail.com"
  const customerPhone = searchParams.get("customerPhone") || "0912345678"
  const paymentMethod = searchParams.get("paymentMethod") || "credit-card"

  const checkIn = new Date(checkInStr)
  const checkOut = new Date(checkOutStr)

  useEffect(() => {
    // Tìm thông tin khách sạn và phòng
    const foundHotel = hotelsData.find((h) => h.id === hotelId)
    setHotel(foundHotel)

    if (foundHotel && roomId) {
      const foundRoom = foundHotel.rooms.find((r: any) => r.id === roomId)
      setRoom(foundRoom)
    }

    setIsLoading(false)

    // Hiệu ứng confetti khi trang tải
    if (showConfetti) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#0ea5e9", "#22c55e", "#eab308"]

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const runConfetti = () => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          particleCount,
          spread: 70,
          origin: { y: 0.6 },
          colors,
          disableForReducedMotion: true,
        })

        requestAnimationFrame(runConfetti)
      }

      runConfetti()

      // Dừng confetti sau 3 giây
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [hotelId, roomId, showConfetti])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const calculateNights = () => {
    return differenceInDays(checkOut, checkIn)
  }

  const nights = calculateNights()

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Hiển thị thông báo lỗi nếu không tìm thấy khách sạn
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy thông tin đặt phòng</h1>
        <p className="text-gray-600 mb-6">Thông tin đặt phòng không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
          Quay lại trang chủ
        </Button>
      </div>
    )
  }

  // Lấy icon cho phương thức thanh toán
  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case "credit-card":
        return <CreditCard className="h-5 w-5 text-blue-600" />
      case "paypal":
        return (
          <Image
            src="/placeholder.svg?height=20&width=60&text=PayPal"
            alt="PayPal"
            width={60}
            height={20}
            className="h-5"
          />
        )
      case "google-pay":
        return (
          <Image
            src="/placeholder.svg?height=20&width=60&text=GooglePay"
            alt="Google Pay"
            width={60}
            height={20}
            className="h-5"
          />
        )
      case "vnpay":
        return (
          <Image
            src="/placeholder.svg?height=20&width=60&text=VNPay"
            alt="VNPay"
            width={60}
            height={20}
            className="h-5"
          />
        )
      default:
        return <CreditCard className="h-5 w-5 text-blue-600" />
    }
  }

  // Lấy tên phương thức thanh toán
  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case "credit-card":
        return "Thẻ tín dụng/ghi nợ"
      case "paypal":
        return "PayPal"
      case "google-pay":
        return "Google Pay"
      case "vnpay":
        return "VNPay"
      default:
        return "Thẻ tín dụng/ghi nợ"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header với animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Đặt phòng thành công!</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cảm ơn bạn đã đặt phòng tại {hotel.name}. Chúng tôi đã gửi email xác nhận đến{" "}
            <span className="font-medium text-gray-800">{customerEmail}</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Thông tin đặt phòng */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Chi tiết đặt phòng</h2>
                  <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Đã xác nhận</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3 relative h-48 rounded-lg overflow-hidden">
                    <Image src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex">
                        {Array.from({ length: hotel.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {Array.from({ length: hotel.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">Resort & Spa</span>
                    </div>
                    <div className="flex items-start mb-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{hotel.address}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 text-sm">+84 258 3590 360</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 text-sm">reservation@vinpearl.com</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Mã đặt phòng</div>
                    <div className="text-lg font-bold text-blue-600">{bookingId}</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Vui lòng cung cấp mã đặt phòng này khi liên hệ với khách sạn hoặc khi nhận phòng.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      Thông tin đặt phòng
                    </h4>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Loại phòng</span>
                        <span className="font-medium">{room ? room.name : "Phòng Deluxe"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nhận phòng</span>
                        <div className="flex items-center">
                          <span className="font-medium">{format(checkIn, "dd/MM/yyyy", { locale: vi })}</span>
                          <span className="text-gray-500 ml-1">(từ 14:00)</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Trả phòng</span>
                        <div className="flex items-center">
                          <span className="font-medium">{format(checkOut, "dd/MM/yyyy", { locale: vi })}</span>
                          <span className="text-gray-500 ml-1">(trước 12:00)</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Số đêm</span>
                        <span className="font-medium">{nights} đêm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Khách</span>
                        <div className="flex items-center">
                          <span className="font-medium">
                            {adults} người lớn, {children} trẻ em
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      Thông tin khách hàng
                    </h4>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Họ tên</span>
                        <span className="font-medium">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">{customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Số điện thoại</span>
                        <span className="font-medium">{customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phương thức thanh toán</span>
                        <div className="flex items-center">
                          {getPaymentIcon()}
                          <span className="font-medium ml-2">{getPaymentMethodName()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Trạng thái thanh toán</span>
                        <span className="text-green-600 font-medium flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Đã thanh toán
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Giá phòng ({nights} đêm)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Thuế và phí</span>
                    <span>Đã bao gồm</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Thông tin hữu ích và QR code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* QR Code */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                  <h3 className="font-bold flex items-center">
                    <QrCode className="h-4 w-4 mr-2" />
                    Mã QR đặt phòng
                  </h3>
                </div>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="bg-white p-2 border border-gray-200 rounded-lg mb-3">
                    <Image
                      src="/placeholder.svg?height=200&width=200&text=QR+Code"
                      alt="QR Code"
                      width={200}
                      height={200}
                      className="w-40 h-40"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Quét mã QR này khi nhận phòng để check-in nhanh chóng
                  </p>
                  <div className="mt-4 w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Lưu vào điện thoại
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Thông tin hữu ích */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Thông tin hữu ích</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Giờ nhận phòng</h4>
                        <p className="text-sm text-gray-600">Từ 14:00 đến 22:00</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Đưa đón sân bay</h4>
                        <p className="text-sm text-gray-600">Có phụ phí, liên hệ trước</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Chính sách trẻ em</h4>
                        <p className="text-sm text-gray-600">Trẻ em dưới 6 tuổi được ở miễn phí</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Tải xác nhận đặt phòng
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Chia sẻ chi tiết đặt phòng
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center">
                        <Printer className="h-4 w-4 mr-2" />
                        In xác nhận
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Dịch vụ bổ sung */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-bold mb-4">Dịch vụ bổ sung</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-blue-100">
              <h4 className="font-medium mb-2">Dịch vụ đưa đón sân bay</h4>
              <p className="text-sm text-gray-600 mb-2">Đặt dịch vụ đưa đón để di chuyển thuận tiện hơn</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                Đặt ngay <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-blue-100">
              <h4 className="font-medium mb-2">Đặt bàn nhà hàng</h4>
              <p className="text-sm text-gray-600 mb-2">Trải nghiệm ẩm thực đặc sắc tại nhà hàng của khách sạn</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                Đặt ngay <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-blue-100">
              <h4 className="font-medium mb-2">Dịch vụ spa</h4>
              <p className="text-sm text-gray-600 mb-2">Thư giãn với các liệu pháp spa cao cấp</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                Đặt ngay <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thông báo quan trọng */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"
        >
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Thông tin quan trọng</h4>
              <p className="text-sm text-gray-700">
                Vui lòng mang theo giấy tờ tùy thân (CMND/CCCD/Hộ chiếu) khi nhận phòng. Nếu bạn cần thay đổi hoặc hủy
                đặt phòng, vui lòng liên hệ với chúng tôi ít nhất 3 ngày trước ngày nhận phòng để được hỗ trợ.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Nút điều hướng */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button variant="outline" onClick={() => router.push("/")} className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            Quay lại trang chủ
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/account/bookings")}>
            Xem đặt phòng của tôi
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
