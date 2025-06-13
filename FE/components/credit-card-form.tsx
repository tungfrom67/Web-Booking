"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

interface CreditCardFormProps {
  cardData: {
    cardNumber: string
    cardName: string
    cardExpiry: string
    cardCvv: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CreditCardForm({ cardData, onChange }: CreditCardFormProps) {
  return (
    <div className="space-y-4 mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div>
        <Label htmlFor="cardNumber">Số thẻ</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={onChange}
            placeholder="1234 5678 9012 3456"
            required
            className="pr-10"
          />
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div>
        <Label htmlFor="cardName">Tên chủ thẻ</Label>
        <Input id="cardName" name="cardName" value={cardData.cardName} onChange={onChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cardExpiry">Ngày hết hạn (MM/YY)</Label>
          <Input
            id="cardExpiry"
            name="cardExpiry"
            value={cardData.cardExpiry}
            onChange={onChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <Label htmlFor="cardCvv">Mã bảo mật (CVV)</Label>
          <div className="relative">
            <Input
              id="cardCvv"
              name="cardCvv"
              value={cardData.cardCvv}
              onChange={onChange}
              placeholder="123"
              required
              className="pr-10"
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 flex items-center mt-2">
        <Lock className="h-3 w-3 mr-1" />
        Thông tin thẻ của bạn được mã hóa và truyền an toàn
      </div>
    </div>
  )
}
