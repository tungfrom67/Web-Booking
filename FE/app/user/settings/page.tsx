"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield, Bell, Globe, CreditCard, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    emailBooking: true,
    emailPromotion: false,
    emailReview: true,
    pushBooking: true,
    pushPromotion: false,
    smsBooking: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    reviewsVisible: true,
    showEmail: false,
    showPhone: false,
  })

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp!")
      return
    }
    // Implement password change logic
    console.log("Changing password...")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log("Deleting account...")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="privacy">Quyền riêng tư</TabsTrigger>
          <TabsTrigger value="preferences">Tùy chọn</TabsTrigger>
        </TabsList>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Đổi mật khẩu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <Button onClick={handlePasswordSubmit} className="w-full">
                Cập nhật mật khẩu
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Xác thực qua SMS</p>
                  <p className="text-sm text-gray-600">Nhận mã xác thực qua tin nhắn</p>
                </div>
                <Switch />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Ứng dụng xác thực</p>
                  <p className="text-sm text-gray-600">Sử dụng Google Authenticator hoặc tương tự</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phiên đăng nhập</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Chrome trên Windows</p>
                    <p className="text-sm text-gray-600">Hiện tại • TP.HCM, Việt Nam</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Đăng xuất
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Safari trên iPhone</p>
                    <p className="text-sm text-gray-600">2 ngày trước • Hà Nội, Việt Nam</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Đăng xuất
                  </Button>
                </div>
              </div>

              <Button variant="destructive" className="w-full mt-4">
                Đăng xuất tất cả thiết bị khác
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} />
                Thông báo Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Xác nhận đặt phòng</p>
                  <p className="text-sm text-gray-600">Nhận email khi đặt phòng thành công</p>
                </div>
                <Switch
                  checked={notifications.emailBooking}
                  onCheckedChange={(value) => handleNotificationChange("emailBooking", value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Khuyến mãi và ưu đãi</p>
                  <p className="text-sm text-gray-600">Nhận thông tin về các chương trình khuyến mãi</p>
                </div>
                <Switch
                  checked={notifications.emailPromotion}
                  onCheckedChange={(value) => handleNotificationChange("emailPromotion", value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Phản hồi đánh giá</p>
                  <p className="text-sm text-gray-600">Nhận thông báo khi có phản hồi đánh giá</p>
                </div>
                <Switch
                  checked={notifications.emailReview}
                  onCheckedChange={(value) => handleNotificationChange("emailReview", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông báo đẩy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Trạng thái đặt phòng</p>
                  <p className="text-sm text-gray-600">Thông báo về thay đổi trạng thái đặt phòng</p>
                </div>
                <Switch
                  checked={notifications.pushBooking}
                  onCheckedChange={(value) => handleNotificationChange("pushBooking", value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Ưu đãi đặc biệt</p>
                  <p className="text-sm text-gray-600">Thông báo về các ưu đãi giới hạn thời gian</p>
                </div>
                <Switch
                  checked={notifications.pushPromotion}
                  onCheckedChange={(value) => handleNotificationChange("pushPromotion", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông báo SMS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Xác nhận đặt phòng</p>
                  <p className="text-sm text-gray-600">Nhận SMS xác nhận đặt phòng</p>
                </div>
                <Switch
                  checked={notifications.smsBooking}
                  onCheckedChange={(value) => handleNotificationChange("smsBooking", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hiển thị hồ sơ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Hồ sơ công khai</p>
                  <p className="text-sm text-gray-600">Cho phép người khác xem hồ sơ của bạn</p>
                </div>
                <Switch
                  checked={privacy.profileVisible}
                  onCheckedChange={(value) => handlePrivacyChange("profileVisible", value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Hiển thị đánh giá</p>
                  <p className="text-sm text-gray-600">Cho phép hiển thị đánh giá của bạn</p>
                </div>
                <Switch
                  checked={privacy.reviewsVisible}
                  onCheckedChange={(value) => handlePrivacyChange("reviewsVisible", value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Hiển thị email</p>
                  <p className="text-sm text-gray-600">Cho phép khách sạn xem email của bạn</p>
                </div>
                <Switch
                  checked={privacy.showEmail}
                  onCheckedChange={(value) => handlePrivacyChange("showEmail", value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Hiển thị số điện thoại</p>
                  <p className="text-sm text-gray-600">Cho phép khách sạn xem số điện thoại</p>
                </div>
                <Switch
                  checked={privacy.showPhone}
                  onCheckedChange={(value) => handlePrivacyChange("showPhone", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dữ liệu cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Tải xuống dữ liệu của tôi
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 size={16} className="mr-2" />
                    Xóa tài khoản
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Xóa tài khoản</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác và tất cả dữ liệu của bạn sẽ
                      bị xóa vĩnh viễn.
                    </p>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Dữ liệu sẽ bị xóa:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Thông tin cá nhân</li>
                        <li>• Lịch sử đặt phòng</li>
                        <li>• Đánh giá và bình luận</li>
                        <li>• Danh sách yêu thích</li>
                        <li>• Điểm thưởng tích lũy</li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Hủy</Button>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Xác nhận xóa
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} />
                Ngôn ngữ và khu vực
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ngôn ngữ</Label>
                <Select defaultValue="vi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Múi giờ</Label>
                <Select defaultValue="asia/ho_chi_minh">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia/ho_chi_minh">GMT+7 (Việt Nam)</SelectItem>
                    <SelectItem value="asia/seoul">GMT+9 (Seoul)</SelectItem>
                    <SelectItem value="asia/tokyo">GMT+9 (Tokyo)</SelectItem>
                    <SelectItem value="america/new_york">GMT-5 (New York)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Đơn vị tiền tệ</Label>
                <Select defaultValue="vnd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vnd">VND (₫)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="krw">KRW (₩)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={20} />
                Phương thức thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <CreditCard size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 1234</p>
                      <p className="text-sm text-gray-600">Visa • Hết hạn 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <CreditCard size={16} className="text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 5678</p>
                      <p className="text-sm text-gray-600">Mastercard • Hết hạn 08/26</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Thêm phương thức thanh toán
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tùy chọn đặt phòng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Tự động áp dụng điểm thưởng</p>
                  <p className="text-sm text-gray-600">Sử dụng điểm thưởng để giảm giá tự động</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Nhớ thông tin thanh toán</p>
                  <p className="text-sm text-gray-600">Lưu thông tin để đặt phòng nhanh hơn</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Gợi ý khách sạn tương tự</p>
                  <p className="text-sm text-gray-600">Hiển thị khách sạn tương tự khi đặt phòng</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
