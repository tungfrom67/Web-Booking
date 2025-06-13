"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Dữ liệu đánh giá mẫu
const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "15/04/2025",
    comment:
      "Dịch vụ tuyệt vời, đặt phòng nhanh chóng và dễ dàng. Tôi đã tìm được khách sạn ưng ý với giá tốt nhất. Nhân viên hỗ trợ rất nhiệt tình và chuyên nghiệp. Chắc chắn sẽ sử dụng dịch vụ này cho những chuyến đi tiếp theo!",
    location: "Hà Nội",
    hotel: "JW Marriott Hotel Hanoi",
    hotelImage: "/placeholder.svg?height=100&width=100",
    helpfulCount: 24,
    featured: true,
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    date: "20/03/2025",
    comment:
      "Rất hài lòng với trải nghiệm đặt phòng. Giao diện dễ sử dụng và có nhiều lựa chọn phù hợp với ngân sách. Tuy nhiên, tôi nghĩ có thể cải thiện thêm về tính năng lọc tìm kiếm để dễ dàng tìm được phòng phù hợp hơn.",
    location: "TP. Hồ Chí Minh",
    hotel: "Vinpearl Resort & Spa Nha Trang",
    hotelImage: "/placeholder.svg?height=100&width=100",
    helpfulCount: 18,
    featured: true,
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "05/05/2025",
    comment:
      "Chương trình Genius thực sự tiết kiệm cho tôi rất nhiều chi phí. Sẽ tiếp tục sử dụng dịch vụ trong tương lai. Đặc biệt ấn tượng với chất lượng phòng và dịch vụ chăm sóc khách hàng.",
    location: "Đà Nẵng",
    hotel: "Furama Resort Đà Nẵng",
    hotelImage: "/placeholder.svg?height=100&width=100",
    helpfulCount: 32,
    featured: true,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "10/02/2025",
    comment:
      "Tôi đã sử dụng dịch vụ này cho chuyến du lịch gia đình và rất hài lòng với kết quả. Giá cả hợp lý và nhiều ưu đãi hấp dẫn. Tuy nhiên, tôi gặp một chút khó khăn khi thay đổi ngày đặt phòng.",
    location: "Nha Trang",
    hotel: "Vinpearl Resort & Spa Nha Trang",
    hotelImage: "/placeholder.svg?height=100&width=100",
    helpfulCount: 15,
    featured: false,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "25/03/2025",
    comment:
      "Đây là lần thứ ba tôi sử dụng dịch vụ và vẫn luôn hài lòng. Đặc biệt ấn tượng với chương trình khách hàng thân thiết và những ưu đãi độc quyền. Nhân viên hỗ trợ rất chuyên nghiệp và nhiệt tình.",
    location: "Phú Quốc",
    hotel: "Fusion Maia Đà Nẵng",
    hotelImage: "/placeholder.svg?height=100&width=100",
    helpfulCount: 27,
    featured: false,
  },
]

// Thống kê đánh giá
const reviewStats = {
  averageRating: 4.7,
  totalReviews: 1245,
  ratingDistribution: [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1.5 },
    { stars: 1, percentage: 0.5 },
  ],
  satisfactionRate: 96,
}

export function CustomerReviewsEnhanced() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const featuredReviews = reviews.filter((review) => review.featured)

  // Xử lý autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredReviews.length)
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, featuredReviews.length])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredReviews.length) % featuredReviews.length)
    setAutoplay(false)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredReviews.length)
    setAutoplay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoplay(false)
  }

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl -z-10"></div>
      <div className="absolute top-10 left-10 text-blue-200 opacity-30 -z-10">
        <Quote size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-indigo-200 opacity-30 -z-10">
        <Quote size={80} />
      </div>

      <div className="py-16 px-4 md:px-10 rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header with stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Khách hàng nói gì về chúng tôi
                </h2>
                <p className="text-gray-600 mb-6">
                  Khám phá trải nghiệm thực tế từ hơn {reviewStats.totalReviews.toLocaleString()} khách hàng đã sử dụng
                  dịch vụ của chúng tôi
                </p>

                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                    <div className="text-4xl font-bold text-blue-600 mr-3">{reviewStats.averageRating}</div>
                    <div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(reviewStats.averageRating)
                                ? "text-yellow-400 fill-yellow-400"
                                : star - 0.5 <= reviewStats.averageRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        Dựa trên {reviewStats.totalReviews.toLocaleString()} đánh giá
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tỷ lệ hài lòng</span>
                    <span className="text-sm font-bold text-green-600">{reviewStats.satisfactionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${reviewStats.satisfactionRate}%` }}
                    ></div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Xem tất cả đánh giá</Button>
              </motion.div>
            </div>

            <div className="lg:col-span-2 relative">
              {/* Featured Review Carousel */}
              <div className="relative h-full">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white shadow-lg hover:bg-blue-50"
                    onClick={handlePrev}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>

                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white shadow-lg hover:bg-blue-50"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-xl h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 h-full"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-start mb-6">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                            <Image
                              src={featuredReviews[currentIndex].avatar || "/placeholder.svg"}
                              alt={featuredReviews[currentIndex].name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{featuredReviews[currentIndex].name}</h3>
                            <p className="text-gray-500 text-sm">{featuredReviews[currentIndex].location}</p>
                            <div className="flex mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(featuredReviews[currentIndex].rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : i + 0.5 <= featuredReviews[currentIndex].rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <Badge className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200">
                            Đánh giá nổi bật
                          </Badge>
                        </div>

                        <div className="flex-grow">
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200 opacity-50" />
                            <p className="text-gray-700 italic pl-6 pr-6 text-lg leading-relaxed">
                              {featuredReviews[currentIndex].comment}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="relative w-10 h-10 rounded-md overflow-hidden mr-3">
                                <Image
                                  src={featuredReviews[currentIndex].hotelImage || "/placeholder.svg"}
                                  alt={featuredReviews[currentIndex].hotel}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{featuredReviews[currentIndex].hotel}</p>
                                <p className="text-xs text-gray-500">{featuredReviews[currentIndex].date}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{featuredReviews[currentIndex].helpfulCount} người thấy hữu ích</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-4">
                  {featuredReviews.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 mx-1 rounded-full transition-all ${
                        index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
                      }`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(review.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i + 0.5 <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{review.comment}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 font-medium">{review.hotel}</span>
                  <div className="flex items-center text-gray-500">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{review.helpfulCount}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
