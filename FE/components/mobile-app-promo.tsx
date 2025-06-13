import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AppleIcon, SmartphoneIcon } from "lucide-react"

export function MobileAppPromo() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Đặt phòng dễ dàng với ứng dụng di động</h2>
          <p className="text-gray-600 mb-6">
            Tải ứng dụng HotelBooking để đặt phòng nhanh chóng, nhận thông báo ưu đãi đặc biệt và quản lý đặt phòng mọi
            lúc, mọi nơi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800">
              <AppleIcon className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-xs">Tải về trên</span>
                <span className="text-sm font-medium">App Store</span>
              </div>
            </Button>
            <Button className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800">
              <SmartphoneIcon className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-xs">Tải về trên</span>
                <span className="text-sm font-medium">Google Play</span>
              </div>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image src="/placeholder.svg?height=400&width=600" alt="Mobile App" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
