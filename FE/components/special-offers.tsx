import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const offers = [
  {
    id: "summer-sale",
    title: "Kỳ nghỉ hè giảm đến 30%",
    description: "Đặt phòng trước 30/6 để nhận ưu đãi đặc biệt cho kỳ nghỉ hè",
    image: "/placeholder.svg?height=200&width=400",
    discount: "30%",
    expiry: "30/06/2025",
    link: "/promotions/summer-sale",
  },
  {
    id: "early-booking",
    title: "Đặt sớm - Tiết kiệm nhiều",
    description: "Đặt trước 30 ngày để nhận giảm giá 15% cho mọi đặt phòng",
    image: "/placeholder.svg?height=200&width=400",
    discount: "15%",
    expiry: "Không giới hạn",
    link: "/promotions/early-booking",
  },
  {
    id: "genius-member",
    title: "Ưu đãi thành viên Genius",
    description: "Thành viên Genius được giảm giá 10% tại hàng nghìn chỗ nghỉ",
    image: "/placeholder.svg?height=200&width=400",
    discount: "10%",
    expiry: "Không giới hạn",
    link: "/promotions/genius-member",
  },
]

export function SpecialOffers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <Link href={offer.link} key={offer.id} className="block">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <div className="relative h-48">
              <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
              <Badge className="absolute top-2 right-2 bg-red-600">Giảm {offer.discount}</Badge>
            </div>
            <CardContent className="p-4 flex flex-col h-[calc(100%-12rem)]">
              <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{offer.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Hết hạn: {offer.expiry}</p>
                <Button variant="outline" size="sm">
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
