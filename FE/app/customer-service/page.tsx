import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MessageSquare, Clock, Search, HelpCircle, ArrowRight } from "lucide-react"

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Dịch vụ khách hàng"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dịch vụ khách hàng</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong mọi vấn đề liên quan đến đặt phòng và dịch vụ
          </p>
          <div className="w-full max-w-md">
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
              <h3 className="text-xl font-bold mb-2">Gọi cho chúng tôi</h3>
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
              <div className="text-lg font-bold text-blue-600 mb-4">support@hotelbooking.vn</div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Gửi email</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Chủ đề phổ biến</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-600"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Thanh toán</h3>
                <p className="text-gray-600 mb-4">
                  Thông tin về các phương thức thanh toán, hoàn tiền, và xử lý các vấn đề thanh toán.
                </p>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                  <Link href="/help-center/payment" className="flex items-center">
                    Xem hướng dẫn <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-600"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Đặt phòng</h3>
                <p className="text-gray-600 mb-4">
                  Hướng dẫn đặt phòng, thay đổi hoặc hủy đặt phòng, và các câu hỏi liên quan.
                </p>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                  <Link href="/help-center/booking" className="flex items-center">
                    Xem hướng dẫn <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-600"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Tài khoản</h3>
                <p className="text-gray-600 mb-4">
                  Thông tin về đăng ký, đăng nhập, quản lý tài khoản và bảo mật thông tin cá nhân.
                </p>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                  <Link href="/help-center/account" className="flex items-center">
                    Xem hướng dẫn <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-600"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Vấn đề khẩn cấp</h3>
                <p className="text-gray-600 mb-4">
                  Hướng dẫn xử lý các vấn đề khẩn cấp trong chuyến đi, liên hệ hỗ trợ 24/7 và các tình huống đặc biệt.
                </p>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                  <Link href="/help-center/emergency" className="flex items-center">
                    Xem hướng dẫn <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Câu hỏi thường gặp</h2>

        <Tabs defaultValue="booking" className="mb-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="booking">Đặt phòng</TabsTrigger>
            <TabsTrigger value="payment">Thanh toán</TabsTrigger>
            <TabsTrigger value="account">Tài khoản</TabsTrigger>
          </TabsList>

          <TabsContent value="booking" className="mt-6">
            <div className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">Làm thế nào để đặt phòng trên HotelBooking?</h3>
                      <p className="text-gray-600 text-sm">
                        Để đặt phòng, bạn chỉ cần tìm kiếm khách sạn theo điểm đến, chọn ngày nhận phòng và trả phòng,
                        chọn phòng phù hợp và hoàn tất thanh toán. Bạn sẽ nhận được xác nhận đặt phòng qua email.
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
                      <h3 className="font-bold mb-1">Làm thế nào để hủy đặt phòng?</h3>
                      <p className="text-gray-600 text-sm">
                        Để hủy đặt phòng, đăng nhập vào tài khoản của bạn, vào mục "Đặt phòng của tôi", chọn đặt phòng
                        cần hủy và nhấp vào "Hủy đặt phòng". Lưu ý chính sách hủy phòng có thể khác nhau tùy theo khách
                        sạn.
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
                      <h3 className="font-bold mb-1">Tôi có thể thay đổi ngày đặt phòng không?</h3>
                      <p className="text-gray-600 text-sm">
                        Có, bạn có thể thay đổi ngày đặt phòng tùy thuộc vào chính sách của khách sạn. Đăng nhập vào tài
                        khoản, vào mục "Đặt phòng của tôi", chọn đặt phòng cần thay đổi và nhấp vào "Thay đổi ngày".
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
                      <h3 className="font-bold mb-1">Tôi có thể đặt phòng cho người khác không?</h3>
                      <p className="text-gray-600 text-sm">
                        Có, bạn có thể đặt phòng cho người khác. Khi đặt phòng, bạn có thể nhập thông tin của người sẽ
                        nhận phòng trong mục "Thông tin khách hàng".
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <div className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">HotelBooking chấp nhận những phương thức thanh toán nào?</h3>
                      <p className="text-gray-600 text-sm">
                        HotelBooking chấp nhận nhiều phương thức thanh toán bao gồm thẻ tín dụng/ghi nợ (Visa,
                        MasterCard, JCB), ví điện tử (Momo, ZaloPay), chuyển khoản ngân hàng và thanh toán tại khách sạn
                        (đối với một số khách sạn).
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
                      <h3 className="font-bold mb-1">Khi nào tôi sẽ bị trừ tiền?</h3>
                      <p className="text-gray-600 text-sm">
                        Tùy thuộc vào chính sách của khách sạn, bạn có thể bị trừ tiền ngay khi đặt phòng hoặc chỉ thanh
                        toán khi nhận phòng. Thông tin này sẽ được hiển thị rõ trong quá trình đặt phòng.
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
                      <h3 className="font-bold mb-1">Làm thế nào để yêu cầu hoàn tiền?</h3>
                      <p className="text-gray-600 text-sm">
                        Để yêu cầu hoàn tiền, bạn cần hủy đặt phòng theo chính sách hủy phòng của khách sạn. Nếu đủ điều
                        kiện hoàn tiền, số tiền sẽ được hoàn lại vào phương thức thanh toán ban đầu trong vòng 5-10 ngày
                        làm việc.
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
                      <h3 className="font-bold mb-1">Tôi có nhận được hóa đơn cho đặt phòng không?</h3>
                      <p className="text-gray-600 text-sm">
                        Có, sau khi hoàn tất đặt phòng, bạn sẽ nhận được email xác nhận kèm theo thông tin thanh toán.
                        Nếu bạn cần hóa đơn VAT, vui lòng liên hệ với khách sạn khi nhận phòng hoặc liên hệ với bộ phận
                        hỗ trợ khách hàng của chúng tôi.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <div className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">Làm thế nào để tạo tài khoản HotelBooking?</h3>
                      <p className="text-gray-600 text-sm">
                        Để tạo tài khoản, nhấp vào "Đăng ký" ở góc trên bên phải trang web, nhập email, mật khẩu và
                        thông tin cá nhân của bạn. Bạn cũng có thể đăng ký nhanh bằng tài khoản Google hoặc Facebook.
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
                      <h3 className="font-bold mb-1">Làm thế nào để thay đổi mật khẩu?</h3>
                      <p className="text-gray-600 text-sm">
                        Để thay đổi mật khẩu, đăng nhập vào tài khoản của bạn, vào mục "Tài khoản", chọn "Bảo mật" và
                        nhấp vào "Thay đổi mật khẩu". Bạn sẽ cần nhập mật khẩu hiện tại và mật khẩu mới.
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
                      <h3 className="font-bold mb-1">Làm thế nào để cập nhật thông tin cá nhân?</h3>
                      <p className="text-gray-600 text-sm">
                        Để cập nhật thông tin cá nhân, đăng nhập vào tài khoản của bạn, vào mục "Tài khoản", chọn "Thông
                        tin cá nhân" và nhấp vào "Chỉnh sửa". Bạn có thể cập nhật tên, số điện thoại, địa chỉ và các
                        thông tin khác.
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
                      <h3 className="font-bold mb-1">Tôi quên mật khẩu, phải làm sao?</h3>
                      <p className="text-gray-600 text-sm">
                        Nếu bạn quên mật khẩu, nhấp vào "Đăng nhập", sau đó chọn "Quên mật khẩu". Nhập email đăng ký của
                        bạn và làm theo hướng dẫn được gửi đến email để đặt lại mật khẩu.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Link href="/faq">Xem tất cả câu hỏi thường gặp</Link>
          </Button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Gửi yêu cầu hỗ trợ</h2>
              <p className="text-gray-600 mb-6">
                Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, vui lòng điền vào biểu mẫu bên dưới và đội ngũ
                hỗ trợ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
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
                    <label className="block text-sm font-medium mb-1">Mã đặt phòng (nếu có)</label>
                    <Input placeholder="Nhập mã đặt phòng của bạn" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Loại yêu cầu</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Chọn loại yêu cầu</option>
                      <option value="booking">Đặt phòng</option>
                      <option value="payment">Thanh toán</option>
                      <option value="account">Tài khoản</option>
                      <option value="refund">Hoàn tiền</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mô tả vấn đề</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Mô tả chi tiết vấn đề của bạn"
                      rows={5}
                    ></textarea>
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
              <h2 className="text-3xl font-bold mb-4">Thông tin liên hệ</h2>
              <p className="text-gray-600 mb-6">
                Bạn có thể liên hệ với chúng tôi qua các kênh dưới đây hoặc ghé thăm văn phòng của chúng tôi.
              </p>
              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-blue-600"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Địa chỉ văn phòng</h3>
                        <p className="text-gray-600">
                          Tòa nhà HotelBooking, 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Việt Nam
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Số điện thoại</h3>
                        <p className="text-gray-600">
                          Tổng đài: 1900 1234
                          <br />
                          Hỗ trợ khách hàng: +84 28 7300 1234
                          <br />
                          Hỗ trợ đối tác: +84 28 7300 5678
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Email</h3>
                        <p className="text-gray-600">
                          Hỗ trợ khách hàng: support@hotelbooking.vn
                          <br />
                          Hỗ trợ đối tác: partners@hotelbooking.vn
                          <br />
                          Góp ý, khiếu nại: feedback@hotelbooking.vn
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Giờ làm việc</h3>
                        <p className="text-gray-600">
                          Tổng đài: 24/7
                          <br />
                          Văn phòng: Thứ Hai - Thứ Sáu (8:00 - 17:30)
                          <br />
                          Chat trực tuyến: 8:00 - 22:00 hàng ngày
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Kết nối với chúng tôi</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-12 h-12 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-12 h-12 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Đăng ký để nhận thông tin về các ưu đãi đặc biệt, mẹo du lịch và cập nhật mới nhất từ HotelBooking
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email của bạn"
              className="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-blue-300"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Đăng ký</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
