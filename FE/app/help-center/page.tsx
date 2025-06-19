import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowRight, BookOpen, Video, FileText, HelpCircle } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Trung tâm trợ giúp"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trung tâm trợ giúp</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Tìm câu trả lời cho mọi câu hỏi của bạn về HotelBooking
          </p>
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi hoặc chủ đề..."
                className="w-full h-14 pl-10 pr-4 rounded-full border-0 focus:ring-2 focus:ring-blue-500 text-base"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-12 bg-blue-600 hover:bg-blue-700">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Chủ đề phổ biến</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
                Tìm hiểu cách đặt phòng, thay đổi hoặc hủy đặt phòng, và các câu hỏi liên quan đến đặt phòng.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/help-center/booking/how-to-book" className="text-blue-600 hover:underline">
                    Cách đặt phòng
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/booking/cancellation" className="text-blue-600 hover:underline">
                    Chính sách hủy phòng
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/booking/modification" className="text-blue-600 hover:underline">
                    Thay đổi đặt phòng
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                <Link href="/help-center/booking" className="flex items-center">
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/help-center/payment/methods" className="text-blue-600 hover:underline">
                    Phương thức thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/payment/refund" className="text-blue-600 hover:underline">
                    Chính sách hoàn tiền
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/payment/security" className="text-blue-600 hover:underline">
                    Bảo mật thanh toán
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                <Link href="/help-center/payment" className="flex items-center">
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/help-center/account/registration" className="text-blue-600 hover:underline">
                    Đăng ký tài khoản
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/account/password" className="text-blue-600 hover:underline">
                    Quên mật khẩu
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/account/profile" className="text-blue-600 hover:underline">
                    Cập nhật thông tin cá nhân
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                <Link href="/help-center/account" className="flex items-center">
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/help-center/emergency/contact" className="text-blue-600 hover:underline">
                    Liên hệ khẩn cấp
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/emergency/lost-items" className="text-blue-600 hover:underline">
                    Đồ vật bị mất
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/emergency/safety" className="text-blue-600 hover:underline">
                    An toàn và bảo mật
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                <Link href="/help-center/emergency" className="flex items-center">
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Đánh giá và phản hồi</h3>
              <p className="text-gray-600 mb-4">
                Thông tin về cách đánh giá chỗ nghỉ, gửi phản hồi và giải quyết các vấn đề liên quan đến đánh giá.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/help-center/reviews/how-to-review" className="text-blue-600 hover:underline">
                    Cách đánh giá chỗ nghỉ
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/reviews/guidelines" className="text-blue-600 hover:underline">
                    Quy định đánh giá
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/reviews/dispute" className="text-blue-600 hover:underline">
                    Khiếu nại đánh giá
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                <Link href="/help-center/reviews" className="flex items-center">
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Liên hệ và hỗ trợ</h3>
              <p className="text-gray-600 mb-4">
                Thông tin về cách liên hệ với đội ngũ hỗ trợ khách hàng và các kênh hỗ trợ khác.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/help-center/support/contact" className="text-blue-600 hover:underline">
                    Thông tin liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/support/chat" className="text-blue-600 hover:underline">
                    Chat trực tuyến
                  </Link>
                </li>
                <li>
                  <Link href="/help-center/support/feedback" className="text-blue-600 hover:underline">
                    Gửi phản hồi
                  </Link>
                </li>
              </ul>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                <Link href="/help-center/support" className="flex items-center">
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tài nguyên hữu ích</h2>

          <Tabs defaultValue="guides" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="guides">Hướng dẫn</TabsTrigger>
              <TabsTrigger value="videos">Video</TabsTrigger>
              <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Hướng dẫn đặt phòng chi tiết",
                    desc: "Hướng dẫn từng bước về cách đặt phòng trên HotelBooking",
                    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    title: "Cách chọn phòng phù hợp",
                    desc: "Mẹo để chọn phòng phù hợp với nhu cầu và ngân sách của bạn",
                    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    title: "Hướng dẫn thanh toán an toàn",
                    desc: "Các bước để đảm bảo thanh toán an toàn và bảo mật",
                    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                  },
                ].map((guide, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">{guide.icon}</div>
                        <div>
                          <h3 className="font-bold mb-2">{guide.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{guide.desc}</p>
                          <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                            <Link href="#" className="flex items-center">
                              Đọc hướng dẫn <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Hướng dẫn đặt phòng",
                    desc: "Video hướng dẫn chi tiết về cách đặt phòng trên HotelBooking",
                    icon: <Video className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    title: "Cách sử dụng bộ lọc tìm kiếm",
                    desc: "Video hướng dẫn sử dụng bộ lọc để tìm chỗ nghỉ phù hợp",
                    icon: <Video className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    title: "Hướng dẫn thanh toán",
                    desc: "Video hướng dẫn các phương thức thanh toán trên HotelBooking",
                    icon: <Video className="h-6 w-6 text-blue-600" />,
                  },
                ].map((video, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">{video.icon}</div>
                        <div>
                          <h3 className="font-bold mb-2">{video.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{video.desc}</p>
                          <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                            <Link href="#" className="flex items-center">
                              Xem video <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Câu hỏi về đặt phòng",
                    desc: "Các câu hỏi thường gặp về quy trình đặt phòng",
                    icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    title: "Câu hỏi về thanh toán",
                    desc: "Các câu hỏi thường gặp về phương thức thanh toán và hoàn tiền",
                    icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    title: "Câu hỏi về tài khoản",
                    desc: "Các câu hỏi thường gặp về quản lý tài khoản và bảo mật",
                    icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
                  },
                ].map((faq, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">{faq.icon}</div>
                        <div>
                          <h3 className="font-bold mb-2">{faq.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{faq.desc}</p>
                          <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                            <Link href="#" className="flex items-center">
                              Xem câu hỏi <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/resources">Xem tất cả tài nguyên</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Bài viết mới nhất</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Cách tìm ưu đãi tốt nhất cho kỳ nghỉ của bạn",
              date: "15/05/2025",
              category: "Mẹo du lịch",
              icon: <FileText className="h-6 w-6 text-blue-600" />,
            },
            {
              title: "Hướng dẫn đặt phòng cho nhóm lớn",
              date: "10/05/2025",
              category: "Đặt phòng",
              icon: <FileText className="h-6 w-6 text-blue-600" />,
            },
            {
              title: "Cập nhật chính sách hoàn tiền mới",
              date: "05/05/2025",
              category: "Chính sách",
              icon: <FileText className="h-6 w-6 text-blue-600" />,
            },
            {
              title: "Tính năng mới: Đặt phòng theo giờ",
              date: "01/05/2025",
              category: "Tính năng mới",
              icon: <FileText className="h-6 w-6 text-blue-600" />,
            },
          ].map((article, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">{article.icon}</div>
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.category}</span>
                    </div>
                    <h3 className="font-bold mb-4">{article.title}</h3>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                      <Link href="#" className="flex items-center">
                        Đọc bài viết <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Không tìm thấy câu trả lời?</h2>
              <p className="max-w-xl">
                Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, đội ngũ hỗ trợ khách hàng của chúng tôi luôn
                sẵn sàng giúp đỡ bạn.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">Liên hệ với chúng tôi</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-blue-700">
                <Link href="/customer-service">Dịch vụ khách hàng</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Đăng ký nhận tin</h2>
              <p className="max-w-xl text-gray-600">
                Đăng ký để nhận các bài viết hướng dẫn, mẹo du lịch và cập nhật mới nhất từ HotelBooking.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full sm:w-64 border border-gray-300"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Đăng ký</Button>
              </div\
