"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Star, Phone, Wifi, Car, Utensils, Dumbbell, Waves } from "lucide-react"

export default function AddHotelPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    category: "",
    starRating: 5,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    amenities: [] as string[],
    images: [] as string[],
  })

  const amenitiesList = [
    { id: "wifi", label: "WiFi miễn phí", icon: Wifi },
    { id: "parking", label: "Bãi đỗ xe", icon: Car },
    { id: "restaurant", label: "Nhà hàng", icon: Utensils },
    { id: "gym", label: "Phòng gym", icon: Dumbbell },
    { id: "pool", label: "Hồ bơi", icon: Waves },
    { id: "spa", label: "Spa", icon: Star },
    { id: "room-service", label: "Dịch vụ phòng 24/7", icon: Phone },
    { id: "laundry", label: "Giặt ủi", icon: Star },
  ]

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((id) => id !== amenityId),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Hotel data:", formData)
    // Handle form submission
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Thêm khách sạn mới</h1>
        <p className="text-muted-foreground">Tạo thông tin khách sạn mới trong hệ thống</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Nhập thông tin chính của khách sạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Tên khách sạn *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="VD: Khách sạn Luxury Palace"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả chi tiết về khách sạn..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Loại khách sạn</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">Khách sạn</SelectItem>
                      <SelectItem value="resort">Resort</SelectItem>
                      <SelectItem value="motel">Motel</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="starRating">Xếp hạng sao</Label>
                  <Select
                    value={formData.starRating.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, starRating: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <SelectItem key={star} value={star.toString()}>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: star }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin liên hệ */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>Địa chỉ và thông tin liên lạc</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Địa chỉ *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Số nhà, tên đường..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Thành phố *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                      <SelectItem value="halong">Hạ Long</SelectItem>
                      <SelectItem value="dalat">Đà Lạt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Quốc gia</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quốc gia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vietnam">Việt Nam</SelectItem>
                      <SelectItem value="thailand">Thái Lan</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+84 xxx xxx xxx"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@hotel.com"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  placeholder="https://hotel.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tiện nghi */}
        <Card>
          <CardHeader>
            <CardTitle>Tiện nghi khách sạn</CardTitle>
            <CardDescription>Chọn các tiện nghi có sẵn tại khách sạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenitiesList.map((amenity) => {
                const Icon = amenity.icon
                return (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={formData.amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                    />
                    <Label htmlFor={amenity.id} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4" />
                      {amenity.label}
                    </Label>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Thời gian check-in/out */}
        <Card>
          <CardHeader>
            <CardTitle>Thời gian check-in/out</CardTitle>
            <CardDescription>Thiết lập thời gian nhận và trả phòng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkInTime">Thời gian check-in</Label>
                <Input
                  id="checkInTime"
                  type="time"
                  value={formData.checkInTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, checkInTime: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="checkOutTime">Thời gian check-out</Label>
                <Input
                  id="checkOutTime"
                  type="time"
                  value={formData.checkOutTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, checkOutTime: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hình ảnh */}
        <Card>
          <CardHeader>
            <CardTitle>Hình ảnh khách sạn</CardTitle>
            <CardDescription>Tải lên hình ảnh của khách sạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Button type="button" variant="outline">
                  Chọn hình ảnh
                </Button>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Hủy
          </Button>
          <Button type="submit">Tạo khách sạn</Button>
        </div>
      </form>
    </div>
  )
}
