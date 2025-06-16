import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, ArrowRight, Download, Mail, Phone } from "lucide-react"

// Dữ liệu tin tức mẫu
const pressReleases = [
  {
    id: "pr-1",
    title: "HotelBooking đạt mốc 5 triệu người dùng hàng tháng",
    date: "15/05/2025",
    summary:
      "HotelBooking vừa đạt cột mốc quan trọng với 5 triệu người dùng hàng tháng, khẳng định vị thế là nền tảng đặt phòng hàng đầu tại Việt Nam.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Công ty",
    featured: true,
  },
  {
    id: "pr-2",
    title: "HotelBooking mở rộng hoạt động tại thị trường Đông Nam Á",
    date: "02/04/2025",
    summary:
      "Sau thành công tại Việt Nam, HotelBooking chính thức mở rộng hoạt động sang các thị trường Thái Lan, Indonesia và Malaysia.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Kinh doanh",
    featured: true,
  },
  {
    id: "pr-3",
    title: "HotelBooking ra mắt tính năng đặt phòng theo giờ",
    date: "20/03/2025",
    summary:
      "Đáp ứng nhu cầu ngày càng tăng của người dùng, HotelBooking vừa ra mắt tính năng đặt phòng theo giờ, mang đến sự linh hoạt tối đa cho khách hàng.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sản phẩm",
    featured: false,
  },
  {
    id: "pr-4",
    title: "HotelBooking được vinh danh trong Top 10 Startup Việt Nam 2024",
    date: "15/02/2025",
    summary: "HotelBooking vinh dự được Forbes Việt Nam bình chọn vào Top 10 Startup tiêu biểu của Việt Nam năm 2024.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Giải thưởng",
    featured: false,
  },
  {
    id: "pr-5",
    title: "HotelBooking hợp tác với Tổng cục Du lịch Việt Nam",
    date: "10/01/2025",
    summary:
      "HotelBooking và Tổng cục Du lịch Việt Nam ký kết thỏa thuận hợp tác nhằm thúc đẩy du lịch nội địa và quốc tế.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Đối tác",
    featured: false,
  },
  {
    id: "pr-6",
    title: "HotelBooking triển khai chương trình bảo vệ môi trường",
    date: "05/12/2024",
    summary:
      "HotelBooking khởi động chương trình 'Du lịch xanh' với cam kết trồng 1 cây xanh cho mỗi 100 đơn đặt phòng.",
    image: "/placeholder.svg?height=400&width=600",
    category: "CSR",
    featured: false,
  },
]

// Dữ liệu báo chí mẫu
const mediaAppearances = [
  {
    id: "media-1",
    title: "HotelBooking - Câu chuyện thành công của startup Việt",
    publication: "VnExpress",
    date: "20/04/2025",
    link: "https://vnexpress.net",
    image: "/placeholder.svg?height=100&width=200&text=VnExpress",
  },
  {
    id: "media-2",
    title: "Cách HotelBooking chinh phục thị trường đặt phòng trực tuyến",
    publication: "Báo Tuổi Trẻ",
    date: "15/03/2025",
    link: "https://tuoitre.vn",
    image: "/placeholder.svg?height=100&width=200&text=TuoiTre",
  },
  {
    id: "media-3",
    title: "Phỏng vấn CEO HotelBooking về tương lai của du lịch số",
    publication: "Forbes Vietnam",
    date: "10/02/2025",
    link: "https://forbes.vn",
    image: "/placeholder.svg?height=100&width=200&text=Forbes",
  },
  {
    id: "media-4",
    title: "HotelBooking và chiến lược vượt qua đại dịch",
    publication: "Báo Thanh Niên",
    date: "05/01/2025",
    link: "https://thanhnien.vn",
    image: "/placeholder.svg?height=100&width=200&text=ThanhNien",
  },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="HotelBooking Press"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trung tâm báo chí</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Tin tức, thông cáo báo chí và thông tin mới nhất về HotelBooking
          </p>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Liên hệ báo chí</h2>
            <p className="text-gray-600 mb-4 md:mb-0">
              Bạn là nhà báo hoặc blogger? Hãy liên hệ với chúng tôi để biết thêm thông tin.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <Link href="mailto:press@hotelbooking.vn">press@hotelbooking.vn</Link>
            </Button>
            <Button variant="outline" className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <Link href="tel:+842873002468">+84 28 7300 2468</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Tin tức nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressReleases
            .filter((item) => item.featured)
            .map((item) => (
              <Card key={item.id} className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">{item.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.summary}</p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                    <Link href={`/press/${item.id}`} className="flex items-center">
                      Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Thông cáo báo chí</h2>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="company">Công ty</TabsTrigger>
              <TabsTrigger value="product">Sản phẩm</TabsTrigger>
              <TabsTrigger value="business">Kinh doanh</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pressReleases.map((item) => (
                  <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-600">{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                        <Link href={`/press/${item.id}`} className="flex items-center">
                          Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="company" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pressReleases
                  .filter((item) => item.category === "Công ty" || item.category === "Giải thưởng")
                  .map((item) => (
                    <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-600">{item.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                          <Link href={`/press/${item.id}`} className="flex items-center">
                            Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="product" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pressReleases
                  .filter((item) => item.category === "Sản phẩm")
                  .map((item) => (
                    <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-600">{item.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                          <Link href={`/press/${item.id}`} className="flex items-center">
                            Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pressReleases
                  .filter(
                    (item) => item.category === "Kinh doanh" || item.category === "Đối tác" || item.category === "CSR",
                  )
                  .map((item) => (
                    <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-600">{item.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                          <Link href={`/press/${item.id}`} className="flex items-center">
                            Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/press/archive">Xem tất cả thông cáo báo chí</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Media Appearances */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">HotelBooking trên báo chí</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mediaAppearances.map((item) => (
            <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="relative w-16 h-16 flex-shrink-0 mr-4 overflow-hidden rounded">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.publication}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span>{item.publication}</span>
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Đọc bài viết <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Bộ tài liệu truyền thông</h2>
                <p className="text-gray-600">
                  Tải xuống logo, hình ảnh và tài liệu truyền thông chính thức của HotelBooking.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                <Download className="mr-2 h-4 w-4" />
                <Link href="/press/press-kit">Tải xuống Press Kit</Link>
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-2 h-32 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=200&text=Logo"
                    alt="HotelBooking Logo"
                    width={150}
                    height={75}
                  />
                </div>
                <p className="text-sm font-medium">Logo chính thức</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-2 h-32 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=200&text=Logo+Dark"
                    alt="HotelBooking Logo Dark"
                    width={150}
                    height={75}
                  />
                </div>
                <p className="text-sm font-medium">Logo nền tối</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-2 h-32 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100&text=Icon"
                    alt="HotelBooking Icon"
                    width={75}
                    height={75}
                  />
                </div>
                <p className="text-sm font-medium">Biểu tượng</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-2 h-32 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=200&text=Brand+Guidelines"
                    alt="Brand Guidelines"
                    width={150}
                    height={75}
                  />
                </div>
                <p className="text-sm font-medium">Hướng dẫn thương hiệu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Đăng ký nhận tin tức</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Đăng ký để nhận thông báo về các thông cáo báo chí và tin tức mới nhất từ HotelBooking.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Đăng ký</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
