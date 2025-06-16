import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageSquare, Clock, Search, HelpCircle, CheckCircle } from "lucide-react"

export default function PartnerSupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Hỗ trợ đối tác"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hỗ trợ đối tác</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn để đảm bảo thành công trên nền tảng HotelBooking
          </p>
          <div className="mt-6 w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi hoặc vấn đề..."
                className="w-full h-12 pl-10 pr-4 rounded-full border-0 focus:ring-2 focus:ring-blue-500"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-blue-600 hover:bg-blue-700">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Liên hệ với chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hỗ trợ qua điện thoại</h3>
              <p className="text-gray-600 mb-4">Gọi cho chúng tôi để được hỗ trợ trực tiếp từ đội ngũ chuyên gia</p>
              <div className="text-lg font-bold text-blue-600 mb-2">1900 1234</div>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>24/7, tất cả các ngày trong tuần</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Gọi ngay</Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chat trực tuyến</h3>
              <p className="text-gray-600 mb-4">Chat với đội ngũ hỗ trợ của chúng tôi để được giải đáp nhanh chóng</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>8:00 - 22:00, tất cả các ngày trong tuần</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Bắt đầu chat</Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gửi email</h3>
              <p className="text-gray-600 mb-4">Gửi email cho chúng tôi và nhận phản hồi trong vòng 24 giờ</p>
              <div className="text-lg font-bold text-blue-600 mb-4">partners@hotelbooking.vn</div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Gửi email</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Gửi yêu cầu hỗ trợ</h2>
              <p className="text-gray-600 mb-6">
                Điền vào biểu mẫu bên dưới và đội ngũ hỗ trợ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Họ tên</label>
                    <Input placeholder="Nhập họ tên của bạn" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <Input placeholder="Nhập số điện thoại của bạn" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên chỗ nghỉ</label>
                    <Input placeholder="Nhập tên chỗ nghỉ của bạn" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Loại yêu cầu</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Chọn loại yêu cầu</option>
                      <option value="technical">Vấn đề kỹ thuật</option>
                      <option value="account">Quản lý tài khoản</option>
                      <option value="booking">Quản lý đặt phòng</option>
                      <option value="payment">Thanh toán</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mô tả vấn đề</label>
                    <Textarea placeholder="Mô tả chi tiết vấn đề của bạn" rows={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tệp đính kèm (nếu có)</label>
                    <Input type="file" />
                    <p className="text-xs text-gray-500 mt-1">Tối đa 5MB (JPG, PNG, PDF)</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Gửi yêu cầu</Button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Câu hỏi thường gặp</h2>
              <p className="text-gray-600 mb-6">
                Tìm câu trả lời nhanh chóng cho các câu hỏi phổ biến nhất của đối tác.
              </p>
              <div className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-1">Làm thế nào để cập nhật thông tin chỗ nghỉ?</h3>
                        <p className="text-gray-600 text-sm">
                          Đăng nhập vào tài khoản đối tác, vào mục "Quản lý chỗ nghỉ" và chọn "Cập nhật thông tin" để
                          thay đổi thông tin chỗ nghỉ của bạn.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-1">Làm thế nào để quản lý đặt phòng?</h3>
                        <p className="text-gray-600 text-sm">
                          Truy cập vào mục "Đặt phòng" trong tài khoản đối tác để xem, xác nhận hoặc hủy các đặt phòng.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-1">Khi nào tôi nhận được thanh toán?</h3>
                        <p className="text-gray-600 text-sm">
                          Thanh toán được thực hiện vào ngày 15 hàng tháng cho tất cả các đặt phòng đã hoàn thành trong
                          tháng trước.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-1">Làm thế nào để thay đổi giá phòng?</h3>
                        <p className="text-gray-600 text-sm">
                          Vào mục "Quản lý giá & Tình trạng" trong tài khoản đối tác để cập nhật giá phòng theo ngày,
                          tuần hoặc mùa.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center mt-6">
                  <Button variant="outline">
                    <Link href="/partners/faq">Xem tất cả câu hỏi</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Đội ngũ hỗ trợ của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Nguyễn Văn A",
              role: "Quản lý hỗ trợ đối tác",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Trần Thị B",
              role: "Chuyên viên hỗ trợ kỹ thuật",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Lê Văn C",
              role: "Chuyên viên hỗ trợ tài khoản",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Phạm Thị D",
              role: "Chuyên viên hỗ trợ thanh toán",
              image: "/placeholder.svg?height=200&width=200",
            },
          ].map((member, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} width={96} height={96} className="object-cover" />
                </div>
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Support Stats */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Cam kết hỗ trợ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold mb-2">15 phút</h3>
                <p className="text-gray-600">Thời gian phản hồi trung bình cho chat trực tuyến</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold mb-2">4 giờ</h3>
                <p className="text-gray-600">Thời gian phản hồi trung bình cho email</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold mb-2">98%</h3>
                <p className="text-gray-600">Tỷ lệ hài lòng của đối tác với dịch vụ hỗ trợ</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Đối tác nói gì về dịch vụ hỗ trợ của chúng tôi</h2>
        <div className="gri\
