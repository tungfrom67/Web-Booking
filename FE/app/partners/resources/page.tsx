import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  FileText,
  Video,
  Download,
  Calendar,
  TrendingUp,
  Search,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react"

export default function PartnerResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Trung tâm tài nguyên"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trung tâm tài nguyên</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Khám phá các tài nguyên, hướng dẫn và công cụ để tối ưu hóa hiệu suất chỗ nghỉ của bạn
          </p>
          <div className="mt-6 w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm tài nguyên..."
                className="w-full h-12 pl-10 pr-4 rounded-full border-0 focus:ring-2 focus:ring-blue-500"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-blue-600 hover:bg-blue-700">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Khám phá tài nguyên theo danh mục</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hướng dẫn sử dụng</h3>
              <p className="text-gray-600 mb-4">Các hướng dẫn chi tiết về cách sử dụng nền tảng HotelBooking</p>
              <Button variant="outline" className="w-full">
                Xem hướng dẫn
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Video hướng dẫn</h3>
              <p className="text-gray-600 mb-4">Các video hướng dẫn trực quan về các tính năng của HotelBooking</p>
              <Button variant="outline" className="w-full">
                Xem video
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tài liệu tham khảo</h3>
              <p className="text-gray-600 mb-4">Các tài liệu tham khảo và báo cáo về ngành du lịch và khách sạn</p>
              <Button variant="outline" className="w-full">
                Xem tài liệu
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chiến lược kinh doanh</h3>
              <p className="text-gray-600 mb-4">Các chiến lược và mẹo để tăng doanh thu và hiệu suất</p>
              <Button variant="outline" className="w-full">
                Xem chiến lược
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tài nguyên nổi bật</h2>
          <Tabs defaultValue="guides" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="guides">Hướng dẫn</TabsTrigger>
              <TabsTrigger value="videos">Video</TabsTrigger>
              <TabsTrigger value="webinars">Hội thảo</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Hướng dẫn thiết lập tài khoản đối tác",
                    desc: "Cách thiết lập và tối ưu hóa tài khoản đối tác của bạn trên HotelBooking",
                    image: "/placeholder.svg?height=200&width=400",
                    time: "10 phút đọc",
                  },
                  {
                    title: "Chiến lược định giá hiệu quả",
                    desc: "Các chiến lược định giá để tối đa hóa doanh thu và tỷ lệ lấp đầy phòng",
                    image: "/placeholder.svg?height=200&width=400",
                    time: "15 phút đọc",
                  },
                  {
                    title: "Tối ưu hóa mô tả và hình ảnh",
                    desc: "Cách tạo mô tả hấp dẫn và chọn hình ảnh chất lượng cao",
                    image: "/placeholder.svg?height=200&width=400",
                    time: "12 phút đọc",
                  },
                ].map((guide, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-48">
                      <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{guide.time}</div>
                      <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                      <p className="text-gray-600 mb-4">{guide.desc}</p>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                        <Link href="#" className="flex items-center">
                          Đọc hướng dẫn <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Hướng dẫn sử dụng Extranet",
                    desc: "Video hướng dẫn chi tiết về cách sử dụng hệ thống quản lý Extranet",
                    image: "/placeholder.svg?height=200&width=400",
                    time: "8:25",
                  },
                  {
                    title: "Cách quản lý đặt phòng hiệu quả",
                    desc: "Các mẹo và kỹ thuật để quản lý đặt phòng một cách hiệu quả",
                    image: "/placeholder.svg?height=200&width=400",
                    time: "12:10",
                  },
                  {
                    title: "Tối ưu hóa trang chỗ nghỉ",
                    desc: "Cách tối ưu hóa trang chỗ nghỉ để thu hút nhiều đặt phòng hơn",
                    image: "/placeholder.svg?height=200&width=400",
                    time: "10:45",
                  },
                ].map((video, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-48 group">
                      <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full p-3">
                          <Play className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                        {video.time}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                      <p className="text-gray-600 mb-4">{video.desc}</p>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                        <Link href="#" className="flex items-center">
                          Xem video <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webinars" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Xu hướng du lịch 2025",
                    desc: "Phân tích các xu hướng du lịch mới nhất và cách thích ứng",
                    image: "/placeholder.svg?height=200&width=400",
                    date: "25/05/2025, 15:00",
                  },
                  {
                    title: "Chiến lược marketing cho chỗ nghỉ",
                    desc: "Các chiến lược marketing hiệu quả để thu hút khách hàng mới",
                    image: "/placeholder.svg?height=200&width=400",
                    date: "10/06/2025, 14:00",
                  },
                  {
                    title: "Tối ưu hóa trải nghiệm khách hàng",
                    desc: "Cách cải thiện trải nghiệm khách hàng để tăng đánh giá tích cực",
                    image: "/placeholder.svg?height=200&width=400",
                    date: "18/06/2025, 15:30",
                  },
                ].map((webinar, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={webinar.image || "/placeholder.svg"}
                        alt={webinar.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                        Sắp diễn ra
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{webinar.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                      <p className="text-gray-600 mb-4">{webinar.desc}</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký tham gia</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">Xem tất cả tài nguyên</Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Công cụ hỗ trợ đối tác</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Công cụ phân tích hiệu suất</h3>
                  <p className="text-gray-600 mb-4">
                    Theo dõi và phân tích hiệu suất chỗ nghỉ của bạn với các báo cáo chi tiết và trực quan.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Báo cáo doanh thu và tỷ lệ lấp đầy phòng</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Phân tích đánh giá và phản hồi của khách hàng</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>So sánh với đối thủ cạnh tranh trong khu vực</span>
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-700">Truy cập công cụ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Công cụ quản lý lịch</h3>
                  <p className="text-gray-600 mb-4">
                    Quản lý lịch đặt phòng, giá cả và tình trạng phòng một cách dễ dàng và hiệu quả.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cập nhật tình trạng phòng theo thời gian thực</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Thiết lập giá theo mùa và sự kiện đặc biệt</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Đồng bộ hóa với các nền tảng đặt phòng khác</span>
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-700">Truy cập công cụ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tài liệu tải xuống</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Sổ tay đối tác HotelBooking",
                desc: "Hướng dẫn toàn diện về cách tối đa hóa hiệu suất trên HotelBooking",
                fileSize: "5.2 MB",
                fileType: "PDF",
              },
              {
                title: "Bảng tính phân tích doanh thu",
                desc: "Công cụ Excel để theo dõi và phân tích doanh thu của chỗ nghỉ",
                fileSize: "2.8 MB",
                fileType: "XLSX",
              },
              {
                title: "Bộ công cụ marketing",
                desc: "Các mẫu và hướng dẫn để quảng bá chỗ nghỉ của bạn",
                fileSize: "8.5 MB",
                fileType: "ZIP",
              },
              {
                title: "Báo cáo xu hướng du lịch 2025",
                desc: "Phân tích chi tiết về các xu hướng du lịch mới nhất",
                fileSize: "4.7 MB",
                fileType: "PDF",
              },
              {
                title: "Danh sách kiểm tra chất lượng dịch vụ",
                desc: "Danh sách kiểm tra để đảm bảo chất lượng dịch vụ tốt nhất",
                fileSize: "1.5 MB",
                fileType: "PDF",
              },
              {
                title: "Mẫu phản hồi khách hàng",
                desc: "Các mẫu để trả lời đánh giá và phản hồi của khách hàng",
                fileSize: "3.2 MB",
                fileType: "DOCX",
              },
            ].map((resource, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {resource.fileSize} • {resource.fileType}
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Tải xuống
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Đăng ký nhận bản tin</h2>
              <p className="max-w-xl">
                Nhận các cập nhật mới nhất, mẹo và tài nguyên để tối ưu hóa hiệu suất chỗ nghỉ của bạn trên
                HotelBooking.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex h-10 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Cần thêm hỗ trợ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600">
            Đội ngũ hỗ trợ đối tác của chúng tôi luôn sẵn sàng giúp đỡ bạn với bất kỳ câu hỏi nào
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/partners/support">Liên hệ hỗ trợ</Link>
            </Button>
            <Button variant="outline">
              <Link href="/partners/faq">Câu hỏi thường gặp</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
