import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Check, Shield, Info } from "lucide-react"

interface BookingSummaryProps {
  checkIn: Date
  checkOut: Date
  nights: number
  adults: number
  children: number
  roomName?: string
  bedType?: string
  roomPrice?: number
  discount?: number
  totalPrice?: number
}

export function BookingSummary({
  checkIn,
  checkOut,
  nights,
  adults,
  children,
  roomName,
  bedType,
  roomPrice = 0,
  discount = 0,
  totalPrice = 0,
}: BookingSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const discountedPrice = roomPrice * (1 - discount / 100)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Tóm tắt đặt phòng</h2>

      {roomName && (
        <div className="mb-4">
          <h3 className="font-semibold">{roomName}</h3>
          <p className="text-gray-600 text-sm">{bedType}</p>
        </div>
      )}

      <div className="border-t border-b border-gray-200 py-4 my-4 space-y-2">
        <div className="flex justify-between">
          <span>Nhận phòng</span>
          <span>{format(checkIn, "dd/MM/yyyy", { locale: vi })}</span>
        </div>
        <div className="flex justify-between">
          <span>Trả phòng</span>
          <span>{format(checkOut, "dd/MM/yyyy", { locale: vi })}</span>
        </div>
        <div className="flex justify-between">
          <span>Thời gian lưu trú</span>
          <span>{nights} đêm</span>
        </div>
        <div className="flex justify-between">
          <span>Khách</span>
          <span>
            {adults} người lớn, {children} trẻ em
          </span>
        </div>
      </div>

      {roomPrice > 0 && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>
              {formatPrice(discountedPrice)} x {nights} đêm
            </span>
            <span>{formatPrice(discountedPrice * nights)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá</span>
              <span>-{formatPrice((roomPrice - discountedPrice) * nights)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
            <span>Tổng tiền</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Giá trên đã bao gồm thuế và phí. Bạn có thể hủy miễn phí trước 3 ngày so với ngày nhận phòng.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>Đặt phòng nhanh chóng</span>
        </div>
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>Xác nhận đặt phòng ngay lập tức</span>
        </div>
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>Hủy miễn phí trước 3 ngày</span>
        </div>
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-blue-600 font-medium">Thanh toán an toàn qua cổng thanh toán bảo mật</span>
        </div>
      </div>
    </div>
  )
}
