import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "15/04/2025",
    comment: "Dịch vụ tuyệt vời, đặt phòng nhanh chóng và dễ dàng. Tôi đã tìm được khách sạn ưng ý với giá tốt nhất.",
    location: "Hà Nội",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "20/03/2025",
    comment: "Rất hài lòng với trải nghiệm đặt phòng. Giao diện dễ sử dụng và có nhiều lựa chọn phù hợp với ngân sách.",
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "05/05/2025",
    comment:
      "Chương trình Genius thực sự tiết kiệm cho tôi rất nhiều chi phí. Sẽ tiếp tục sử dụng dịch vụ trong tương lai.",
    location: "Đà Nẵng",
  },
]

export function CustomerReviews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-medium">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">{review.date}</span>
            </div>

            <p className="text-gray-600">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
