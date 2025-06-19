import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, LinkIcon, CheckCircle, Globe, Zap } from "lucide-react"

export default function AffiliateProgram() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Chương trình liên kết"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chương trình liên kết HotelBooking</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Kiếm thu nhập hấp dẫn bằng cách giới thiệu khách hàng đến với nền tảng đặt phòng hàng đầu Việt Nam
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="#register">Đăng ký ngay</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Cách thức hoạt động</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Đăng ký</h3>
            <p className="text-gray-600">
              Đăng ký tham gia chương trình liên kết HotelBooking miễn phí và được phê duyệt nhanh chóng.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Quảng bá</h3>
            <p className="text-gray-600">
              Sử dụng các công cụ tiếp thị và liên kết độc quyền để quảng bá HotelBooking trên nền tảng của bạn.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Chuyển đổi</h3>
            <p className="text-gray-600">
              Người dùng nhấp vào liên kết của bạn và đặt phòng trên HotelBooking, được theo dõi bằng cookie 30 ngày.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Nhận hoa hồng</h3>
            <p className="text-gray-600">
              Nhận hoa hồng hấp dẫn cho mỗi đặt phòng thành công và thanh toán hàng tháng qua nhiều phương thức.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Lợi ích của chương trình liên kết</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Hoa hồng hấp dẫn</h3>
                <p className="text-gray-600 mb-4">
                  Nhận hoa hồng lên đến 8% cho mỗi đặt phòng thành công thông qua liên kết của bạn, với không giới hạn
                  thu nhập.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tỷ lệ hoa hồng cạnh tranh từ 5-8%</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Thanh toán đúng hạn vào ngày 15 hàng tháng</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ngưỡng thanh toán thấp chỉ 500.000 VNĐ</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <LinkIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Công cụ tiếp thị đa dạng</h3>
                <p className="text-gray-600 mb-4">
                  Truy cập vào bộ công cụ tiếp thị đa dạng và chuyên nghiệp để tối ưu hóa hiệu suất quảng bá của bạn.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Banner quảng cáo đa kích thước</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Widget tìm kiếm và đặt phòng</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>API tích hợp linh hoạt</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Hỗ trợ chuyên nghiệp</h3>
                <p className="text-gray-600 mb-4">
                  Nhận hỗ trợ chuyên nghiệp từ đội ngũ quản lý đối tác liên kết và truy cập vào báo cáo chi tiết.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Quản lý đối tác chuyên biệt</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Báo cáo hiệu suất thời gian thực</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tài liệu hướng dẫn chi tiết</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Cơ cấu hoa hồng</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Chương trình liên kết HotelBooking cung cấp một trong những cơ cấu hoa hồng hấp dẫn nhất trong ngành, với tỷ
          lệ tăng dần theo hiệu suất của bạn.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">Cấp độ</th>
                <th className="p-4 text-left">Số lượng đặt phòng/tháng</th>
                <th className="p-4 text-left">Tỷ lệ hoa hồng</th>
                <th className="p-4 text-left">Thời gian cookie</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <Badge className="bg-gray-200 text-gray-700 mr-2">Cơ bản</Badge>
                    <span className="font-medium">Mới bắt đầu</span>
                  </div>
                </td>
                <td className="p-4">1-10</td>
                <td className="p-4 font-medium">5%</td>
                <td className="p-4">30 ngày</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <Badge className="bg-blue-200 text-blue-700 mr-2">Bạc</Badge>
                    <span className="font-medium">Đối tác</span>
                  </div>
                </td>
                <td className="p-4">11-30</td>
                <td className="p-4 font-medium">6%</td>
                <td className="p-4">30 ngày</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <Badge className="bg-yellow-200 text-yellow-700 mr-2">Vàng</Badge>
                    <span className="font-medium">Đối tác cao cấp</span>
                  </div>
                </td>
                <td className="p-4">31-50</td>
                <td className="p-4 font-medium">7%</td>
                <td className="p-4">30 ngày</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <Badge className="bg-purple-200 text-purple-700 mr-2">Bạch kim</Badge>
                    <span className="font-medium">Đối tác VIP</span>
                  </div>
                </td>
                <td className="p-4">51+</td>
                <td className="p-4 font-medium">8%</td>
                <td className="p-4">30 ngày</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          * Hoa hồng được tính trên giá trị đặt phòng sau thuế và phí dịch vụ
        </p>
      </section>

      {/* Marketing Tools */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Công cụ tiếp thị</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Chúng tôi cung cấp đa dạng công cụ tiếp thị để giúp bạn tối đa hóa hiệu suất và thu nhập từ chương trình
            liên kết.
          </p>

          <Tabs defaultValue="banners" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="banners">Banner</TabsTrigger>
              <TabsTrigger value="widgets">Widget</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="banners" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=200&width=400&text=Banner+300x250"
                      alt="Banner 300x250"
                      width={300}
                      height={250}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Banner Rectangle (300x250)</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Banner kích thước phổ biến, phù hợp với hầu hết các vị trí trên website.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Lấy mã nhúng
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=90&width=728&text=Banner+728x90"
                      alt="Banner 728x90"
                      width={400}
                      height={50}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Banner Leaderboard (728x90)</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Banner ngang, phù hợp với vị trí đầu trang hoặc cuối trang web.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Lấy mã nhúng
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=600&width=160&text=Banner+160x600"
                      alt="Banner 160x600"
                      width={100}
                      height={300}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Banner Skyscraper (160x600)</h3>
                    <p className="text-gray-600 text-sm mb-4">Banner dọc, phù hợp với vị trí thanh bên trên website.</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Lấy mã nhúng
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="widgets" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=400&text=Search+Widget"
                      alt="Search Widget"
                      width={300}
                      height={200}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Widget tìm kiếm</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Widget cho phép người dùng tìm kiếm và đặt phòng trực tiếp từ website của bạn.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Lấy mã nhúng
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=400&text=Deals+Widget"
                      alt="Deals Widget"
                      width={300}
                      height={200}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Widget ưu đãi</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Hiển thị các ưu đãi và khuyến mãi đặc biệt từ HotelBooking trên website của bạn.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Lấy mã nhúng
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">API tích hợp</h3>
                  <p className="text-gray-600 mb-6">
                    API của chúng tôi cho phép bạn tích hợp sâu hơn với HotelBooking, tùy chỉnh trải nghiệm người dùng
                    và tối ưu hóa hiệu suất chuyển đổi.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-2">Tính năng API</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Tìm kiếm khách sạn và hiển thị kết quả</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Kiểm tra tình trạng phòng và giá cả</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Tích hợp quy trình đặt phòng</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Truy xuất thông tin khách sạn chi tiết</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Lợi ích API</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Tùy chỉnh giao diện người dùng</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Tích hợp liền mạch với website của bạn</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Tối ưu hóa trải nghiệm người dùng</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Tăng tỷ lệ chuyển đổi</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700">Truy cập tài liệu API</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Câu chuyện thành công</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-bold">TravelBlog.vn</h3>
                  <p className="text-sm text-gray-500">Blog du lịch</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Chương trình liên kết của HotelBooking đã giúp chúng tôi tăng doanh thu 40% chỉ trong 3 tháng. Công cụ
                tiếp thị dễ sử dụng và tỷ lệ chuyển đổi rất cao."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Đối tác từ 2023</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-bold">DuLichViet.com</h3>
                  <p className="text-sm text-gray-500">Website du lịch</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "API của HotelBooking cho phép chúng tôi tích hợp liền mạch vào website của mình. Hoa hồng cạnh tranh và
                thanh toán luôn đúng hạn, rất đáng tin cậy."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Đối tác từ 2022</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-bold">ReviewKhachSan</h3>
                  <p className="text-sm text-gray-500">Blog đánh giá</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Chúng tôi đã thử nhiều chương trình liên kết khác nhau, nhưng HotelBooking mang lại hiệu suất tốt nhất.
                Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ khi cần."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Đối tác từ 2023</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Câu hỏi thường gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Ai có thể tham gia chương trình liên kết?</h3>
                <p className="text-gray-600">
                  Bất kỳ ai sở hữu website, blog, mạng xã hội hoặc nền tảng kỹ thuật số liên quan đến du lịch, lối sống
                  hoặc có đối tượng khách hàng quan tâm đến du lịch đều có thể tham gia.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Làm thế nào để đăng ký tham gia?</h3>
                <p className="text-gray-600">
                  Bạn có thể đăng ký miễn phí thông qua biểu mẫu trên trang web này. Sau khi gửi đơn đăng ký, chúng tôi
                  sẽ xem xét và phản hồi trong vòng 48 giờ làm việc.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Khi nào tôi nhận được thanh toán?</h3>
                <p className="text-gray-600">
                  Thanh toán được thực hiện vào ngày 15 hàng tháng cho tất cả hoa hồng tích lũy trong tháng trước, với
                  điều kiện số dư của bạn đạt ngưỡng tối thiểu 500.000 VNĐ.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Các phương thức thanh toán nào được hỗ trợ?</h3>
                <p className="text-gray-600">
                  Chúng tôi hỗ trợ nhiều phương thức thanh toán bao gồm chuyển khoản ngân hàng, ví điện tử (Momo,
                  ZaloPay), và PayPal cho đối tác quốc tế.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Cookie theo dõi hoạt động trong bao lâu?</h3>
                <p className="text-gray-600">
                  Cookie theo dõi của chúng tôi có hiệu lực trong 30 ngày. Điều này có nghĩa là nếu người dùng nhấp vào
                  liên kết của bạn và đặt phòng trong vòng 30 ngày, bạn vẫn nhận được hoa hồng.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Tôi có thể theo dõi hiệu suất của mình như thế nào?</h3>
                <p className="text-gray-600">
                  Sau khi đăng ký, bạn sẽ được cấp quyền truy cập vào bảng điều khiển đối tác, nơi bạn có thể theo dõi
                  số lượt nhấp, đặt phòng, hoa hồng và các chỉ số hiệu suất khác theo thời gian thực.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">
              <Link href="/partners/affiliate/faq">Xem tất cả câu hỏi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Đăng ký tham gia</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Tại sao nên trở thành đối tác liên kết?</h3>
            <p className="text-gray-600 mb-6">
              Tham gia chương trình liên kết HotelBooking là cách tuyệt vời để kiếm thu nhập thụ động từ website, blog
              hoặc mạng xã hội của bạn. Với tỷ lệ hoa hồng hấp dẫn và công cụ tiếp thị chuyên nghiệp, bạn có thể dễ dàng
              tối đa hóa doanh thu của mình.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Tiếp cận toàn cầu</h4>
                  <p className="text-gray-600 text-sm">
                    Tiếp cận hơn 50,000 chỗ nghỉ trên khắp Việt Nam và quốc tế, mang đến nhiều lựa chọn cho người dùng
                    của bạn.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Thu nhập không giới hạn</h4>
                  <p className="text-gray-600 text-sm">
                    Không có giới hạn về số lượng đặt phòng hoặc hoa hồng bạn có thể kiếm được, mở ra tiềm năng thu nhập
                    không giới hạn.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Dễ dàng bắt đầu</h4>
                  <p className="text-gray-600 text-sm">
                    Quy trình đăng ký đơn giản, công cụ tiếp thị dễ sử dụng và hỗ trợ chuyên nghiệp giúp bạn bắt đầu
                    ngay lập tức.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Đăng ký làm đối tác liên kết</h3>
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
                    <label className="block text-sm font-medium mb-1">Website/Blog/Kênh mạng xã hội</label>
                    <Input placeholder="https://www.example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Loại nền tảng</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Chọn loại nền tảng</option>
                      <option value="blog">Blog du lịch</option>
                      <option value="website">Website du lịch</option>
                      <option value="social">Mạng xã hội</option>
                      <option value="app">Ứng dụng di động</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mô tả nền tảng của bạn</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Mô tả ngắn gọn về nền tảng của bạn và đối tượng khách hàng"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="terms" className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Tôi đồng ý với{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Điều khoản dịch vụ
                      </Link>{" "}
                      và{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Chính sách bảo mật
                      </Link>{" "}
                      của HotelBooking
                    </label>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bắt đầu kiếm thu nhập ngay hôm nay</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Tham gia chương trình liên kết HotelBooking và bắt đầu kiếm thu nhập từ lưu lượng truy cập website của bạn
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="#register">Đăng ký ngay</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              <Link href="/partners/affiliate/contact">Liên hệ với chúng tôi</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
