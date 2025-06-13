"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Waves,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  Clock,
  Users,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoomCard } from "@/components/room-card"
import { ReviewSection } from "@/components/review-section"
import { BookingWidget } from "@/components/booking-widget"
import { hotelsData } from "@/data/hotels"
import { Dumbbell } from "lucide-react"
import { DumbbellIcon as Dumb } from "lucide-react" // Import the missing JSX variable

export default function HotelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const hotelId = params.id as string
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hotel, setHotel] = useState<any>(null)

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

  const amenityIcons: Record<string, JSX.Element> = {
    "Wifi miễn phí": <Wifi className="h-5 w-5" />,
    "Bữa sáng": <Coffee className="h-5 w-5" />,
    "Nhà hàng": <Utensils className="h-5 w-5" />,
    "Bãi đậu xe": <Car className="h-5 w-5" />,
    "Phòng gym": <Dumbbell className="h-5 w-5" />,
    "Hồ bơi": <Waves className="h-5 w-5" />,
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % hotel.images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center p-4 text-white">
              <h3 className="text-xl font-bold">{hotel.name} - Bộ sưu tập ảnh</h3>
              <button onClick={() => setShowGallery(false)} className="p-2 hover:bg-gray-800 rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full flex items-center justify-center"
              >
                <Image
                  src={hotel.images[activeImageIndex] || "/placeholder.svg"}
                  alt={`${hotel.name} - Ảnh ${activeImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 bg-black/80">
              <div className="flex overflow-x-auto gap-2 pb-2">
                {hotel.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`relative flex-shrink-0 cursor-pointer ${
                      index === activeImageIndex ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${hotel.name} - Thumbnail ${index + 1}`}
                      width={100}
                      height={75}
                      className="h-16 w-24 object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-white text-center mt-2">
                {activeImageIndex + 1} / {hotel.images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hotel Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-1">
                <Badge className="bg-blue-600 mr-2">{hotel.type}</Badge>
                <div className="flex">
                  {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {hotel.rating % 1 > 0 && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{hotel.name}</h1>
              <p className="text-gray-600 flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {hotel.address}, {hotel.destination}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={isFavorite ? "text-red-500" : ""}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Preview */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="relative h-80 md:h-96 rounded-tl-lg rounded-bl-lg overflow-hidden">
            <Image
              src={hotel.images[0] || "/placeholder.svg"}
              alt={hotel.name}
              fill
              className="object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => {
                setActiveImageIndex(0)
                setShowGallery(true)
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {hotel.images.slice(1, 5).map((image: string, index: number) => (
              <div
                key={index}
                className={`relative h-[180px] overflow-hidden ${
                  index === 0 ? "rounded-tr-lg" : index === 2 ? "rounded-br-lg" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${hotel.name} - Ảnh ${index + 2}`}
                  fill
                  className="object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={() => {
                    setActiveImageIndex(index + 1)
                    setShowGallery(true)
                  }}
                />
                {index === 3 && hotel.images.length > 5 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                    onClick={() => {
                      setActiveImageIndex(4)
                      setShowGallery(true)
                    }}
                  >
                    <span className="text-white text-lg font-medium">+{hotel.images.length - 5} ảnh</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="rooms">Phòng</TabsTrigger>
                <TabsTrigger value="amenities">Tiện nghi</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Giới thiệu về {hotel.name}</h2>
                  <p className="text-gray-700 mb-6">{hotel.description}</p>

                  <h3 className="text-lg font-semibold mb-3">Điểm nổi bật</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {hotel.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">Thông tin hữu ích</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Nhận phòng</p>
                        <p className="text-gray-600">Từ 14:00</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Trả phòng</p>
                        <p className="text-gray-600">Trước 12:00</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Chính sách trẻ em</p>
                        <p className="text-gray-600">Trẻ em dưới 6 tuổi được miễn phí</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Đỗ xe</p>
                        <p className="text-gray-600">Có bãi đỗ xe miễn phí</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rooms" className="mt-6 space-y-6">
                {hotel.rooms.map((room: any) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Tiện nghi và dịch vụ</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Tiện nghi phổ biến</h3>
                      <ul className="space-y-3">
                        {hotel.amenities.slice(0, 6).map((amenity: string) => (
                          <li key={amenity} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              {amenityIcons[amenity] || <Dumb className="h-5 w-5 text-blue-600" />}
                            </div>
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
                      <ul className="space-y-3">
                        {hotel.services.map((service: string) => (
                          <li key={service} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Tiện nghi phòng</h3>
                      <ul className="space-y-3">
                        {hotel.roomAmenities.map((amenity: string) => (
                          <li key={amenity} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ReviewSection reviews={hotel.reviews} rating={hotel.rating} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:w-1/3">
            <div className="sticky top-20">
              <BookingWidget
                hotelId={hotel.id}
                minPrice={hotel.priceRange.min}
                discount={hotel.discount}
                maxGuests={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
