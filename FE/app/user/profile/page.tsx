"use client"

import { useState } from "react"
import { Camera, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Nguyễn",
    lastName: "Văn A",
    email: "nguyenvana@email.com",
    phone: "0912345678",
    dateOfBirth: "1990-01-01",
    gender: "male",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    bio: "Tôi là một người yêu thích du lịch và khám phá những địa điểm mới.",
    nationality: "vietnamese",
    occupation: "Kỹ sư phần mềm",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data to original values
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Thông tin cá nhân</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit size={16} />
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X size={16} />
              Hủy
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              Lưu
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="text-2xl">NV</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-10 w-10" variant="secondary">
                  <Camera size={16} />
                </Button>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{formData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary">VIP Member</Badge>
                <Badge variant="outline">Đã xác thực</Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Thành viên từ 2023
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-500">Đặt phòng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-500">Đánh giá</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">2,400</div>
                <div className="text-sm text-gray-500">Điểm thưởng</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Họ</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">{formData.firstName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Tên</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">{formData.lastName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">{formData.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              {isEditing ? (
                <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">{formData.phone}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  {new Date(formData.dateOfBirth).toLocaleDateString("vi-VN")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              {isEditing ? (
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  {formData.gender === "male" ? "Nam" : formData.gender === "female" ? "Nữ" : "Khác"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Quốc tịch</Label>
              {isEditing ? (
                <Select value={formData.nationality} onValueChange={(value) => handleChange("nationality", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vietnamese">Việt Nam</SelectItem>
                    <SelectItem value="american">Mỹ</SelectItem>
                    <SelectItem value="korean">Hàn Quốc</SelectItem>
                    <SelectItem value="japanese">Nhật Bản</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  {formData.nationality === "vietnamese" ? "Việt Nam" : "Khác"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Nghề nghiệp</Label>
              {isEditing ? (
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">{formData.occupation}</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            {isEditing ? (
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md">{formData.address}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={3}
                placeholder="Viết vài dòng giới thiệu về bản thân..."
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md">{formData.bio}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Tổng đặt phòng</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Đánh giá đã viết</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2,400</div>
              <div className="text-sm text-gray-600">Điểm thưởng</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">24</div>
              <div className="text-sm text-gray-600">Khách sạn yêu thích</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Đặt phòng tại Khách sạn ABC", date: "2 ngày trước", type: "booking" },
              { action: "Đánh giá Khách sạn XYZ", date: "1 tuần trước", type: "review" },
              { action: "Thêm Khách sạn DEF vào yêu thích", date: "2 tuần trước", type: "favorite" },
              { action: "Cập nhật thông tin cá nhân", date: "1 tháng trước", type: "profile" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "booking"
                      ? "bg-blue-500"
                      : activity.type === "review"
                        ? "bg-green-500"
                        : activity.type === "favorite"
                          ? "bg-red-500"
                          : "bg-gray-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
