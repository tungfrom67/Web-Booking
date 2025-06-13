"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Review } from "@/types/review"

interface ReviewSectionProps {
  reviews: Review[]
  rating: number
}

export function ReviewSection({ reviews, rating }: ReviewSectionProps) {
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, reviews.length))
  }

  const loadLessReviews = () => {
    setVisibleReviews(3)
  }

  const filteredReviews = activeFilter ? reviews.filter((review) => review.category === activeFilter) : reviews

  const displayedReviews = filteredReviews.slice(0, visibleReviews)

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((review) => Math.floor(review.rating) === star).length,
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Đánh giá từ khách hàng</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Rating Overview */}
        <div className="md:w-1/3">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-blue-600">{rating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-gray-600">{reviews.length} đánh giá</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center">
                <span className="w-12 text-sm">{star} sao</span>
                <Progress value={(ratingCounts[index] / reviews.length) * 100} className="h-2 flex-1 mx-2" />
                <span className="w-12 text-right text-sm">{ratingCounts[index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Categories */}
        <div className="md:w-2/3">
          <h3 className="font-semibold mb-3">Đánh giá theo danh mục</h3>
          <div className="flex flex-wrap gap-2">
            {["Tất cả", "Vị trí", "Dịch vụ", "Giá cả", "Sạch sẽ", "Tiện nghi"].map((category) => (
              <Button
                key={category}
                variant={activeFilter === category || (category === "Tất cả" && !activeFilter) ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category === "Tất cả" ? null : category)}
                className={
                  activeFilter === category || (category === "Tất cả" && !activeFilter)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
                <Image
                  src={review.userAvatar || "/placeholder.svg?height=40&width=40"}
                  alt={review.userName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{review.userName}</h4>
                    <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                  </div>
                  <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    <span className="font-bold mr-1">{review.rating.toFixed(1)}</span>
                    <Star className="h-4 w-4 fill-blue-800" />
                  </div>
                </div>

                {review.category && (
                  <div className="mt-1">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {review.category}
                    </span>
                  </div>
                )}

                <p className="mt-2 text-gray-700">{review.comment}</p>

                {review.response && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium">Phản hồi từ khách sạn:</p>
                    <p className="text-sm text-gray-700 mt-1">{review.response}</p>
                  </div>
                )}

                <div className="mt-3 flex items-center text-sm">
                  <button className="flex items-center text-gray-500 hover:text-blue-600 mr-4">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Hữu ích ({review.helpfulCount || 0})
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-red-600">
                    <Flag className="h-4 w-4 mr-1" />
                    Báo cáo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredReviews.length > visibleReviews ? (
          <div className="text-center mt-6">
            <Button variant="outline" onClick={loadMoreReviews}>
              <ChevronDown className="h-4 w-4 mr-2" />
              Xem thêm đánh giá
            </Button>
          </div>
        ) : filteredReviews.length > 3 ? (
          <div className="text-center mt-6">
            <Button variant="outline" onClick={loadLessReviews}>
              <ChevronUp className="h-4 w-4 mr-2" />
              Thu gọn
            </Button>
          </div>
        ) : null}

        {filteredReviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không có đánh giá nào trong danh mục này</p>
          </div>
        )}
      </div>
    </div>
  )
}
