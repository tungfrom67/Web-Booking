import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Hotel, Home, Landmark, Bed, Globe, Users, CheckCircle, ArrowRight } from "lucide-react"

export default function PartnerRegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Đăng ký chỗ nghỉ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Đăng ký chỗ nghỉ của bạn</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Tiếp cận hàng triệu khách hàng tiềm năng và tăng doanh thu với HotelBooking
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Tại sao nên trở thành đối tác của HotelBooking?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tiếp cận hàng triệu khách hàng</h3>
              <p className="text-gray-600">
                Với hơn 5 triệu người dùng, HotelBooking giúp chỗ nghỉ của bạn tiếp cận đến nhiều khách hàng tiềm năng
                hơn.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hiện diện toàn cầu</h3>
              <p className="text-gray-600">
                Chỗ nghỉ của bạn sẽ được hiển thị trên nền tảng toàn cầu, giúp thu hút khách du lịch từ khắp nơi trên
                thế giới.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quản lý dễ dàng</h3>
              <p className="text-gray-600">
                Hệ thống quản lý đơn giản, trực quan giúp bạn dễ dàng cập nhật thông tin, quản lý đặt phòng và theo dõi
                doanh thu.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Loại chỗ nghỉ bạn muốn đăng ký</h2>
          <Tabs defaultValue="hotel" className="mb-8">
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="hotel" className="flex flex-col items-center py-3">
                <Hotel className="h-6 w-6 mb-1" />
                <span>Khách sạn</span>
              </TabsTrigger>
              <TabsTrigger value="apartment" className="flex flex-col items-center py-3">
                <Building className="h-6 w-6 mb-1" />
                <span>Căn hộ</span>
              </TabsTrigger>
              <TabsTrigger value="villa" className="flex flex-col items-center py-3">
                <Home className="h-6 w-6 mb-1" />
                <span>Biệt thự</span>
              </TabsTrigger>
              <TabsTrigger value="resort" className="flex flex-col items-center py-3">
                <Landmark className="h-6 w-6 mb-1" />
                <span>Resort</span>
              </TabsTrigger>
              <TabsTrigger value="homestay" className="flex flex-col items-center py-3">
                <Bed className="h-6 w-6 mb-1" />
                <span>Homestay</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hotel" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Đăng ký khách sạn</h3>
                  <p className="text-gray-600 mb-6">
                    Đăng ký khách sạn của bạn trên HotelBooking để tiếp cận hàng triệu khách hàng tiềm năng. Chúng tôi
                    cung cấp công cụ quản lý đơn giản, hỗ trợ 24/7 và nhiều lợi ích khác.
                  </p>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Tên khách sạn</label>
                        <Input placeholder="Nhập tên khách sạn" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Số sao</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Chọn số sao</option>
                          <option value="1">1 sao</option>
                          <option value="2">2 sao</option>
                          <option value="3">3 sao</option>
                          <option value="4">4 sao</option>
                          <option value="5">5 sao</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                      <Input placeholder="Nhập địa chỉ khách sạn" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Tỉnh/Thành phố</label>
                        <Input placeholder="Nhập tỉnh/thành phố" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Quận/Huyện</label>
                        <Input placeholder="Nhập quận/huyện" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Mã bưu chính</label>
                        <Input placeholder="Nhập mã bưu chính" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mô tả khách sạn</label>
                      <Textarea placeholder="Mô tả chi tiết về khách sạn của bạn" rows={4} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Số phòng</label>
                        <Input type="number" placeholder="Tổng số phòng" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Website</label>
                        <Input placeholder="https://www.example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Họ tên người liên hệ</label>
                        <Input placeholder="Nhập họ tên người liên hệ" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Chức vụ</label>
                        <Input placeholder="Nhập chức vụ" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <Input placeholder="Nhập số điện thoại" />
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
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
            </TabsContent>

            <TabsContent value="apartment" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Đăng ký căn hộ</h3>
                  <p className="text-gray-600 mb-6">
                    Đăng ký căn hộ của bạn trên HotelBooking để tiếp cận hàng triệu khách hàng tiềm năng. Chúng tôi cung
                    cấp công cụ quản lý đơn giản, hỗ trợ 24/7 và nhiều lợi ích khác.
                  </p>
                  {/* Form tương tự như khách sạn nhưng với các trường phù hợp cho căn hộ */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="villa" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Đăng ký biệt thự</h3>
                  <p className="text-gray-600 mb-6">
                    Đăng ký biệt thự của bạn trên HotelBooking để tiếp cận hàng triệu khách hàng tiềm năng. Chúng tôi
                    cung cấp công cụ quản lý đơn giản, hỗ trợ 24/7 và nhiều lợi ích khác.
                  </p>
                  {/* Form tương tự như khách sạn nhưng với các trường phù hợp cho biệt thự */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resort" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Đăng ký resort</h3>
                  <p className="text-gray-600 mb-6">
                    Đăng ký resort của bạn trên HotelBooking để tiếp cận hàng triệu khách hàng tiềm năng. Chúng tôi cung
                    cấp công cụ quản lý đơn giản, hỗ trợ 24/7 và nhiều lợi ích khác.
                  </p>
                  {/* Form tương tự như khách sạn nhưng với các trường phù hợp cho resort */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="homestay" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Đăng ký homestay</h3>
                  <p className="text-gray-600 mb-6">
                    Đăng ký homestay của bạn trên HotelBooking để tiếp cận hàng triệu khách hàng tiềm năng. Chúng tôi
                    cung cấp công cụ quản lý đơn giản, hỗ trợ 24/7 và nhiều lợi ích khác.
                  </p>
                  {/* Form tương tự như khách sạn nhưng với các trường phù hợp cho homestay */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Quy trình đăng ký đơn giản</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Đăng ký thông tin</h3>
            <p className="text-gray-600">Điền thông tin chi tiết về chỗ nghỉ của bạn vào biểu mẫu đăng ký.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Xác minh thông tin</h3>
            <p className="text-gray-600">Đội ngũ của chúng tôi sẽ xác minh thông tin và liên hệ với bạn.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Thiết lập tài khoản</h3>
            <p className="text-gray-600">Tạo tài khoản và cập nhật thông tin chi tiết về chỗ nghỉ của bạn.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Bắt đầu kinh doanh</h3>
            <p className="text-gray-600">
              Chỗ nghỉ của bạn sẽ được hiển thị trên HotelBooking và bắt đầu nhận đặt phòng.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Đối tác nói gì về chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h3 className="font-bold">Khách sạn Sunshine</h3>
                    <p className="text-sm text-gray-500">Hà Nội</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Kể từ khi trở thành đối tác của HotelBooking, công suất phòng của chúng tôi đã tăng 30%. Hệ thống
                  quản lý dễ sử dụng và đội ngũ hỗ trợ rất chuyên nghiệp."
                </p>
                <div className="flex text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h3 className="font-bold">Seaview Resort</h3>
                    <p className="text-sm text-gray-500">Đà Nẵng</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "HotelBooking đã giúp chúng tôi tiếp cận nhiều khách hàng quốc tế hơn. Doanh thu của chúng tôi đã tăng
                  đáng kể và quy trình đặt phòng trở nên đơn giản hơn nhiều."
                </p>
                <div className="flex text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h3 className="font-bold">Green Homestay</h3>
                    <p className="text-sm text-gray-500">Đà Lạt</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Là một homestay nhỏ, chúng tôi đã lo ngại về việc cạnh tranh với các khách sạn lớn. Nhưng
                  HotelBooking đã giúp chúng tôi nổi bật và thu hút đúng khách hàng mục tiêu."
                </p>
                <div className="flex text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Câu hỏi thường gặp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Tôi cần những gì để đăng ký chỗ nghỉ?</h3>
              <p className="text-gray-600">
                Bạn cần cung cấp thông tin cơ bản về chỗ nghỉ như tên, địa chỉ, số phòng, tiện nghi, và thông tin liên
                hệ. Bạn cũng cần chuẩn bị hình ảnh chất lượng cao về chỗ nghỉ của mình.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Mất bao lâu để đăng ký được phê duyệt?</h3>
              <p className="text-gray-600">
                Thông thường, quá trình xác minh và phê duyệt mất từ 24-48 giờ làm việc. Trong một số trường hợp, chúng
                tôi có thể yêu cầu thêm thông tin hoặc tài liệu.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">HotelBooking tính phí như thế nào?</h3>
              <p className="text-gray-600">
                HotelBooking áp dụng mô hình hoa hồng, chỉ tính phí khi có đặt phòng thành công. Tỷ lệ hoa hồng thông
                thường từ 10-15% tùy thuộc vào loại chỗ nghỉ và vị trí.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Tôi có thể quản lý đặt phòng như thế nào?</h3>
              <p className="text-gray-600">
                Sau khi đăng ký, bạn sẽ được cấp quyền truy cập vào Extranet - hệ thống quản lý đặt phòng trực tuyến của
                chúng tôi. Tại đây, bạn có thể cập nhật thông tin, quản lý giá cả, kiểm tra đặt phòng và nhiều tính năng
                khác.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Tôi có thể hủy hợp tác bất cứ lúc nào không?</h3>
              <p className="text-gray-600">
                Có, bạn có thể dừng hợp tác với HotelBooking bất cứ lúc nào. Tuy nhiên, chúng tôi yêu cầu thông báo
                trước ít nhất 30 ngày để đảm bảo xử lý các đặt phòng hiện có.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">HotelBooking có hỗ trợ đa ngôn ngữ không?</h3>
              <p className="text-gray-600">
                Có, HotelBooking hỗ trợ nhiều ngôn ngữ khác nhau, giúp chỗ nghỉ của bạn tiếp cận khách hàng từ nhiều
                quốc gia trên thế giới.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" className="mr-4">
            <Link href="/partners/faq">Xem tất cả câu hỏi</Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Link href="/partners/contact">Liên hệ với chúng tôi</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng tăng doanh thu của bạn?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Đăng ký ngay hôm nay và trở thành đối tác của HotelBooking - nền tảng đặt phòng hàng đầu Việt Nam
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="#register-form" className="flex items-center">
              Đăng ký ngay <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
