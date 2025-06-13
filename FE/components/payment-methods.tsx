"use client"

import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

interface PaymentMethodsProps {
  selectedMethod: string
  onMethodChange: (value: string) => void
}

export function PaymentMethods({ selectedMethod, onMethodChange }: PaymentMethodsProps) {
  return (
    <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="space-y-4">
      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
        <RadioGroupItem value="credit-card" id="credit-card" />
        <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
          Thẻ tín dụng/ghi nợ
        </Label>
        <div className="ml-auto flex items-center space-x-1">
          <Image src="/placeholder.svg?height=20&width=30" alt="Visa" width={30} height={20} className="h-5" />
          <Image src="/placeholder.svg?height=20&width=30" alt="Mastercard" width={30} height={20} className="h-5" />
          <Image src="/placeholder.svg?height=20&width=30" alt="JCB" width={30} height={20} className="h-5" />
        </div>
      </div>

      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
        <RadioGroupItem value="paypal" id="paypal" />
        <Label htmlFor="paypal" className="flex items-center cursor-pointer">
          <Image src="/placeholder.svg?height=20&width=60" alt="PayPal" width={60} height={20} className="h-5 mr-2" />
          PayPal
        </Label>
      </div>

      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
        <RadioGroupItem value="google-pay" id="google-pay" />
        <Label htmlFor="google-pay" className="flex items-center cursor-pointer">
          <Image
            src="/placeholder.svg?height=20&width=60"
            alt="Google Pay"
            width={60}
            height={20}
            className="h-5 mr-2"
          />
          Google Pay
        </Label>
      </div>

      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer">
        <RadioGroupItem value="vnpay" id="vnpay" />
        <Label htmlFor="vnpay" className="flex items-center cursor-pointer">
          <Image src="/placeholder.svg?height=20&width=60" alt="VNPay" width={60} height={20} className="h-5 mr-2" />
          VNPay
        </Label>
      </div>
    </RadioGroup>
  )
}
