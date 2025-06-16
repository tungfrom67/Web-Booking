"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, MapPin, Calendar, Edit, Trash2, ThumbsUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: "1",
      hotelId: "hotel1",
      hotelName: "Khách sạn Luxury Palace",
      hotelAddress: "123 Đường ABC, Quận 1, TP.HCM",
      rating: 5,
      title: "Trải nghiệm tuyệt vời!",
      content: "Khách sạn rất đẹp, phòng ốc sạch sẽ, nhân viên thân thiện. Tôi sẽ quay lại lần sau.",
      date: "2024-01-20",
      bookingId: "BK001234",
      images: ["/placeholder.svg?height=100&width=100"],
      likes: 12,
      replies: 1,
      helpful: 8,
      status: "published",
    },
    {
      id: "2",
      hotelId: "hotel2",
      hotelName: "Resort Biển Xanh",
      hotelAddress: "456 Đường Biển, Nha Trang",
      rating: 4,
      title: "Kỳ nghỉ tuyệt vời bên biển",
      content: "Resort có view biển đẹp, hồ bơi sạch sẽ. Tuy nhiên, dịch vụ ăn uống có thể cải thiện thêm.",
      date: "2024-02-25",
      bookingId: "BK001235",
      images: [],
      likes: 8,
      replies: 0,
      helpful: 5,
      status: "published",
    },
    {
      id: "3",
      hotelId: "hotel3",
      hotelName: "Khách sạn Business Center",
      hotelAddress: "789 Đường DEF, Quận 3, TP.HCM",
      rating: 3,
      title: "Tạm ổn cho công việc",
      content: "Vị trí thuận tiện cho công việc, wifi ổn định. Phòng hơi nhỏ và cách âm không tốt lắm.",
      date: "2024-03-15",
      bookingId: "BK001236",
      images: [],
      likes: 3,
      replies: 1,
      helpful: 2,
      status: "pending",
    },
  ])

  const [editingReview, setEditingReview] = useState<any>(null)
  const [editContent, setEditContent] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editRating, setEditRating] = useState(5)

  const handleEditReview = (review: any) => {
    setEditingReview(review)
    setEditContent(review.content)
    setEditTitle(review.title)
    setEditRating(review.rating)
  }

  const handleSaveEdit = () => {
    if (editingReview) {
      setReviews(
        reviews.map((review) =>
          review.id === editingReview.id
            ? { ...review, content: editContent, title: editTitle, rating: editRating }
            : review,
        ),
      )
      setEditingReview(null)
    }
  }

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review.id !== reviewId))
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Đã đăng</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Đang duyệt</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Bị từ chối</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const ReviewCard = ({ review }: { review: any }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(review.rating)}
              {getStatusBadge(review.status)}
            </div>
            <h3 className="font-bold text-lg">{review.title}</h3>
            <Link href={`/hotels/${review.hotelId}`} className="text-blue-600 hover:underline font-medium">
              {review.hotelName}
            </Link>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin size={14} />
              {review.hotelAddress}
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline" onClick={() => handleEditReview(review)}>
                  <Edit size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa đánh giá</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Đánh giá</Label>
                    {renderStars(editRating, true, setEditRating)}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editTitle">Tiêu đề</Label>
                    <input
                      id="editTitle"
                      className="w-full p-2 border rounded-md"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editContent">Nội dung đánh giá</Label>
                    <Textarea
                      id="editContent"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditingReview(null)}>
                      Hủy
                    </Button>
                    <Button onClick={handleSaveEdit}>Lưu thay đổi</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button size="icon" variant="outline" onClick={() => handleDeleteReview(review.id)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4">{review.content}</p>

        {review.images.length > 0 && (
          <div className="flex gap-2 mb-4">
            {review.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(review.date).toLocaleDateString("vi-VN")}
            </span>
            <span>Mã đặt phòng: {review.bookingId}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ThumbsUp size={14} />
              {review.likes} thích
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              {review.replies} phản hồi
            </span>
            <span>{review.helpful} hữu ích</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Đánh giá của tôi</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {reviews.length} đánh giá
        </Badge>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
            <div className="text-sm text-gray-600">Tổng đánh giá</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Điểm trung bình</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">{reviews.reduce((sum, r) => sum + r.likes, 0)}</div>
            <div className="text-sm text-gray-600">Lượt thích</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">{reviews.reduce((sum, r) => sum + r.helpful, 0)}</div>
            <div className="text-sm text-gray-600">Hữu ích</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="published">Đã đăng</TabsTrigger>
          <TabsTrigger value="pending">Đang duyệt</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          {reviews
            .filter((r) => r.status === "published")
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {reviews
            .filter((r) => r.status === "pending")
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </TabsContent>
      </Tabs>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Star size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Chưa có đánh giá nào</h3>
            <p className="text-gray-600 mb-4">Hãy đặt phòng và chia sẻ trải nghiệm của bạn!</p>
            <Button asChild>
              <Link href="/search">Tìm kiếm khách sạn</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
