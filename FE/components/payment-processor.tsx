"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PaymentMethods } from "@/components/payment-methods"
import { CreditCardForm } from "@/components/credit-card-form"
import { AlertCircle, Lock, Shield } from "lucide-react"
import Image from "next/image"

interface PaymentProcessorProps {
  hotelId: string
  roomId: string
  checkIn: Date
  checkOut: Date
  adults: number
  children: number
  totalPrice: number
  customerData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    specialRequests?: string
  }
}

export function PaymentProcessor({
  hotelId,
  roomId,
  checkIn,
  checkOut,
  adults,
  children,
  totalPrice,
  customerData,
}: PaymentProcessorProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!agreeTerms) {
      setErrorMessage("Vui lòng đồng ý với điều khoản và điều kiện để tiếp tục")
      return
    }

    setIsProcessing(true)

    // Tạo booking ID ngẫu nhiên cho demo
    const bookingId = `BK${Math.floor(Math.random() * 1000000)}`

    try {
      switch (paymentMethod) {
        case "credit-card":
          // Mô phỏng xử lý thanh toán thẻ tín dụng
          await simulatePaymentProcessing()

          // Chuyển hướng đến trang xác nhận đặt phòng
          router.push(
            `/booking/confirmation?bookingId=${bookingId}&hotelId=${hotelId}&roomId=${roomId}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&adults=${adults}&children=${children}&totalPrice=${totalPrice}&customerName=${encodeURIComponent(
              `${customerData.firstName} ${customerData.lastName}`,
            )}&customerEmail=${encodeURIComponent(customerData.email)}&customerPhone=${encodeURIComponent(
              customerData.phone,
            )}&paymentMethod=credit-card`,
          )
          break

        case "paypal":
          // Chuyển hướng đến PayPal
          redirectToExternalPayment("paypal", bookingId)
          break

        case "google-pay":
          // Chuyển hướng đến Google Pay
          redirectToExternalPayment("google-pay", bookingId)
          break

        case "vnpay":
          // Chuyển hướng đến VNPay
          redirectToExternalPayment("vnpay", bookingId)
          break

        default:
          setErrorMessage("Vui lòng chọn phương thức thanh toán")
          setIsProcessing(false)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setErrorMessage("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.")
      setIsProcessing(false)
    }
  }

  // Mô phỏng xử lý thanh toán
  const simulatePaymentProcessing = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  // Chuyển hướng đến cổng thanh toán bên ngoài
  const redirectToExternalPayment = (provider: string, bookingId: string) => {
    // Trong thực tế, bạn sẽ tạo URL chuyển hướng đến cổng thanh toán tương ứng
    // với các tham số cần thiết

    // Mô phỏng chuyển hướng đến cổng thanh toán
    const paymentGateways = {
      paypal: "https://www.paypal.com/checkout",
      "google-pay": "https://pay.google.com",
      vnpay: "https://vnpay.vn",
    }

    // Tạo URL callback để quay lại sau khi thanh toán
    const returnUrl = encodeURIComponent(
      `${window.location.origin}/booking/confirmation?bookingId=${bookingId}&hotelId=${hotelId}&roomId=${roomId}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&adults=${adults}&children=${children}&totalPrice=${totalPrice}&customerName=${encodeURIComponent(
        `${customerData.firstName} ${customerData.lastName}`,
      )}&customerEmail=${encodeURIComponent(customerData.email)}&customerPhone=${encodeURIComponent(
        customerData.phone,
      )}&paymentMethod=${provider}`,
    )

    // Trong môi trường thực tế, bạn sẽ chuyển hướng đến URL thực của cổng thanh toán
    // window.location.href = `${paymentGateways[provider]}?amount=${totalPrice}&orderId=${bookingId}&returnUrl=${returnUrl}`

    // Đối với demo, chúng ta sẽ mô phỏng chuyển hướng và quay lại sau 3 giây
    console.log(`Redirecting to ${provider} payment gateway...`)

    // Mô phỏng chuyển hướng đến trang thanh toán bên ngoài
    setTimeout(() => {
      router.push(
        `/booking/confirmation?bookingId=${bookingId}&hotelId=${hotelId}&roomId=${roomId}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&adults=${adults}&children=${children}&totalPrice=${totalPrice}&customerName=${encodeURIComponent(
          `${customerData.firstName} ${customerData.lastName}`,
        )}&customerEmail=${encodeURIComponent(customerData.email)}&customerPhone=${encodeURIComponent(
          customerData.phone,
        )}&paymentMethod=${provider}`,
      )
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium">Thanh toán an toàn và bảo mật</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} className="h-6" />
              <Image
                src="/placeholder.svg?height=30&width=40"
                alt="Mastercard"
                width={40}
                height={30}
                className="h-6"
              />
              <Image src="/placeholder.svg?height=30&width=40" alt="PayPal" width={40} height={30} className="h-6" />
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment} className="p-4">
          <PaymentMethods selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

          {paymentMethod === "credit-card" && <CreditCardForm cardData={cardData} onChange={handleCardInputChange} />}

          {paymentMethod !== "credit-card" && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <Image
                    src={`/placeholder.svg?height=40&width=60&text=${paymentMethod}`}
                    alt={paymentMethod}
                    width={60}
                    height={40}
                    className="h-8"
                  />
                </div>
                <div>
                  <p className="font-medium mb-1">
                    {paymentMethod === "paypal"
                      ? "Thanh toán qua PayPal"
                      : paymentMethod === "google-pay"
                        ? "Thanh toán qua Google Pay"
                        : "Thanh toán qua VNPay"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Bạn sẽ được chuyển hướng đến trang thanh toán an toàn để hoàn tất giao dịch.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded-lg my-6 border border-yellow-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Lưu ý về thanh toán</p>
                <p className="text-sm text-gray-700">
                  {paymentMethod === "credit-card"
                    ? "Thông tin thẻ của bạn được bảo mật và mã hóa. Chúng tôi không lưu trữ thông tin thẻ của bạn."
                    : "Bạn sẽ được chuyển đến cổng thanh toán an toàn để hoàn tất giao dịch."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2 mb-6">
            <Checkbox id="agreeTerms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(!!checked)} />
            <Label htmlFor="agreeTerms" className="text-sm font-normal">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Điều khoản và Điều kiện
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Chính sách Bảo mật
              </a>
              . Tôi xác nhận đã đủ 18 tuổi.
            </Label>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errorMessage}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              <span className="block">Tổng thanh toán:</span>
              <span className="text-xl font-bold text-gray-900">{formatPrice(totalPrice)}</span>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 min-w-[180px]" disabled={isProcessing}>
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Đang xử lý...
                </div>
              ) : (
                <div className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Thanh toán ngay
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
