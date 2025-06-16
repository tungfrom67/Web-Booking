"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Lock, Bell, Globe, CreditCard, Shield, Upload, Save, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cài đặt hệ thống</h1>
        <p className="text-gray-600 dark:text-gray-400">Quản lý cài đặt và tùy chọn cho hệ thống</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            Chung
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Tài khoản
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Thanh toán
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>Quản lý cài đặt chung cho hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Tên trang web</Label>
                  <Input id="site-name" defaultValue="Hotel Booking System" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Mô tả</Label>
                  <Textarea id="site-description" defaultValue="Hệ thống đặt phòng khách sạn trực tuyến" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email liên hệ</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@hotelbooking.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Số điện thoại liên hệ</Label>
                  <Input id="contact-phone" defaultValue="1900 1234" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cài đặt khu vực</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Ngôn ngữ mặc định</Label>
                    <Select defaultValue="vi">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Chọn ngôn ngữ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                    <Select defaultValue="vnd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND (₫)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Múi giờ</Label>
                    <Select defaultValue="asia_ho_chi_minh">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Chọn múi giờ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia_ho_chi_minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                        <SelectItem value="asia_bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                        <SelectItem value="asia_singapore">Asia/Singapore (GMT+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Định dạng ngày</Label>
                    <Select defaultValue="dd_mm_yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Chọn định dạng ngày" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy_mm_dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tính năng</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cho phép đăng ký tài khoản mới</Label>
                      <p className="text-sm text-gray-500">Khách hàng có thể tự đăng ký tài khoản</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Xác thực email</Label>
                      <p className="text-sm text-gray-500">Yêu cầu xác thực email khi đăng ký</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đánh giá khách hàng</Label>
                      <p className="text-sm text-gray-500">Cho phép khách hàng đánh giá khách sạn</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thanh toán trực tuyến</Label>
                      <p className="text-sm text-gray-500">Cho phép thanh toán qua cổng thanh toán</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin tài khoản</CardTitle>
              <CardDescription>Quản lý thông tin tài khoản admin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Thay đổi ảnh
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG tối đa 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Họ</Label>
                  <Input id="first-name" defaultValue="Nguyễn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Tên</Label>
                  <Input id="last-name" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@hotelbooking.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" defaultValue="0901234567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">Super Admin</Badge>
                  <span className="text-sm text-gray-500">Quyền truy cập đầy đủ</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thay đổi mật khẩu</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Cập nhật thông tin
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật tài khoản</CardTitle>
                <CardDescription>Quản lý cài đặt bảo mật cho tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Xác thực hai yếu tố (2FA)</Label>
                    <p className="text-sm text-gray-500">Tăng cường bảo mật với xác thực hai yếu tố</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo đăng nhập</Label>
                    <p className="text-sm text-gray-500">Nhận thông báo khi có đăng nhập mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tự động đăng xuất</Label>
                    <p className="text-sm text-gray-500">Đăng xuất tự động sau thời gian không hoạt động</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Phiên đăng nhập</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Chrome trên Windows</p>
                          <p className="text-sm text-gray-500">192.168.1.100 • Hiện tại</p>
                        </div>
                      </div>
                      <Badge variant="outline">Hiện tại</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div>
                          <p className="font-medium">Safari trên iPhone</p>
                          <p className="text-sm text-gray-500">192.168.1.101 • 2 giờ trước</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quyền truy cập</CardTitle>
                <CardDescription>Quản lý quyền truy cập và phân quyền</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Quản lý khách sạn</span>
                    </div>
                    <p className="text-sm text-gray-500">Thêm, sửa, xóa thông tin khách sạn</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Quản lý đặt phòng</span>
                    </div>
                    <p className="text-sm text-gray-500">Xem và quản lý đặt phòng</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Quản lý khách hàng</span>
                    </div>
                    <p className="text-sm text-gray-500">Xem và quản lý thông tin khách hàng</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Xem báo cáo</span>
                    </div>
                    <p className="text-sm text-gray-500">Truy cập báo cáo và thống kê</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>Quản lý các loại thông báo bạn muốn nhận</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông báo email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đặt phòng mới</Label>
                      <p className="text-sm text-gray-500">Nhận email khi có đặt phòng mới</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hủy đặt phòng</Label>
                      <p className="text-sm text-gray-500">Nhận email khi có hủy đặt phòng</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Đánh giá mới</Label>
                      <p className="text-sm text-gray-500">Nhận email khi có đánh giá mới</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Báo cáo hàng tuần</Label>
                      <p className="text-sm text-gray-500">Nhận báo cáo tổng hợp hàng tuần</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông báo push</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hoạt động quan trọng</Label>
                      <p className="text-sm text-gray-500">Thông báo về các hoạt động quan trọng</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cảnh báo bảo mật</Label>
                      <p className="text-sm text-gray-500">Thông báo về các vấn đề bảo mật</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cập nhật hệ thống</Label>
                      <p className="text-sm text-gray-500">Thông báo về cập nhật hệ thống</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông báo SMS</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cảnh báo khẩn cấp</Label>
                      <p className="text-sm text-gray-500">SMS cho các tình huống khẩn cấp</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Xác thực đăng nhập</Label>
                      <p className="text-sm text-gray-500">SMS cho xác thực hai yếu tố</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin thanh toán</CardTitle>
                <CardDescription>Quản lý phương thức thanh toán và hóa đơn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cổng thanh toán</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">VNPay</p>
                          <p className="text-sm text-gray-500">Cổng thanh toán VNPay</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">MoMo</p>
                          <p className="text-sm text-gray-500">Ví điện tử MoMo</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">ZaloPay</p>
                          <p className="text-sm text-gray-500">Ví điện tử ZaloPay</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cài đặt phí</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commission">Phí hoa hồng (%)</Label>
                      <Input id="commission" type="number" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-fee">Phí dịch vụ (₫)</Label>
                      <Input id="service-fee" type="number" defaultValue="50000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cancellation-fee">Phí hủy đặt phòng (%)</Label>
                      <Input id="cancellation-fee" type="number" defaultValue="20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="late-fee">Phí check-in muộn (₫)</Label>
                      <Input id="late-fee" type="number" defaultValue="100000" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Thông tin thuế</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vat">VAT (%)</Label>
                      <Input id="vat" type="number" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-code">Mã số thuế</Label>
                      <Input id="tax-code" defaultValue="0123456789" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lịch sử giao dịch</CardTitle>
                <CardDescription>Xem lịch sử các giao dịch gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Đặt phòng #BK001</p>
                        <p className="text-sm text-gray-500">15/01/2024 • VNPay</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">+2,500,000 ₫</p>
                      <Badge variant="default" className="text-xs">
                        Thành công
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Hoàn tiền #RF001</p>
                        <p className="text-sm text-gray-500">14/01/2024 • MoMo</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">-1,200,000 ₫</p>
                      <Badge variant="destructive" className="text-xs">
                        Hoàn tiền
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Notification */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="h-4 w-4" />
          <span>Đã lưu thành công!</span>
        </div>
      )}
    </div>
  )
}
