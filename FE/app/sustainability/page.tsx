import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Heart, ArrowRight, CheckCircle, TreePine, Recycle, Building } from "lucide-react"

// Dữ liệu sáng kiến bền vững
const sustainabilityInitiatives = [
  {
    id: "eco-1",
    title: "Du lịch xanh",
    description:
      "Chương trình khuyến khích du khách và đối tác khách sạn áp dụng các biện pháp thân thiện với môi trường, giảm thiểu rác thải nhựa và tiết kiệm năng lượng.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    category: "Môi trường",
    progress: 75,
  },
  {
    id: "eco-2",
    title: "Trồng 1 triệu cây xanh",
    description:
      "Cam kết trồng 1 triệu cây xanh vào năm 2030 thông qua việc đóng góp một phần doanh thu từ mỗi đơn đặt phòng cho các dự án trồng rừng tại Việt Nam.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <TreePine className="h-6 w-6 text-green-600" />,
    category: "Môi trường",
    progress: 45,
  },
  {
    id: "social-1",
    title: "Du lịch cộng đồng",
    description:
      "Hỗ trợ các cộng đồng địa phương phát triển du lịch bền vững, tạo sinh kế và bảo tồn văn hóa truyền thống thông qua việc kết nối du khách với các homestay và dịch vụ du lịch cộng đồng.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Users className="h-6 w-6 text-blue-600" />,
    category: "Xã hội",
    progress: 60,
  },
  {
    id: "social-2",
    title: "Học bổng du lịch",
    description:
      "Chương trình học bổng dành cho sinh viên ngành du lịch và khách sạn, tạo cơ hội phát triển nghề nghiệp cho thế hệ trẻ và đóng góp vào sự phát triển bền vững của ngành.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Heart className="h-6 w-6 text-red-600" />,
    category: "Xã hội",
    progress: 80,
  },
  {
    id: "gov-1",
    title: "Minh bạch dữ liệu",
    description:
      "Cam kết minh bạch trong việc thu thập, sử dụng và bảo vệ dữ liệu của người dùng, tuân thủ các quy định về bảo vệ dữ liệu và quyền riêng tư.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Building className="h-6 w-6 text-purple-600" />,
    category: "Quản trị",
    progress: 90,
  },
  {
    id: "gov-2",
    title: "Đạo đức kinh doanh",
    description:
      "Xây dựng và thực hiện các chính sách đạo đức kinh doanh, chống tham nhũng và đảm bảo tính minh bạch trong mọi hoạt động kinh doanh.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Building className="h-6 w-6 text-purple-600" />,
    category: "Quản trị",
    progress: 85,
  },
]

// Dữ liệu báo cáo bền vững
const sustainabilityReports = [
  {
    id: "report-2024",
    title: "Báo cáo phát triển bền vững 2024",
    date: "15/03/2025",
    fileSize: "8.5 MB",
  },
  {
    id: "report-2023",
    title: "Báo cáo phát triển bền vững 2023",
    date: "15/03/2024",
    fileSize: "7.8 MB",
  },
]

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="HotelBooking Sustainability"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Phát triển bền vững</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Cam kết của chúng tôi đối với môi trường, xã hội và quản trị doanh nghiệp có trách nhiệm
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            <Link href="#initiatives">Khám phá sáng kiến của chúng tôi</Link>
          </Button>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Cách tiếp cận của chúng tôi</h2>
            <p className="text-gray-600 mb-4">
              Tại HotelBooking, chúng tôi tin rằng du lịch có thể và nên đóng góp tích cực vào xã hội và môi trường.
              Chúng tôi cam kết xây dựng một nền tảng du lịch bền vững, nơi mọi chuyến đi không chỉ mang lại trải nghiệm
              tuyệt vời cho du khách mà còn có tác động tích cực đến cộng đồng địa phương và môi trường.
            </p>
            <p className="text-gray-600 mb-4">
              Chiến lược phát triển bền vững của chúng tôi tập trung vào ba trụ cột chính: Môi trường, Xã hội và Quản
              trị (ESG). Chúng tôi đặt ra các mục tiêu cụ thể và đo lường tiến độ thực hiện để đảm bảo rằng chúng tôi
              đang đi đúng hướng trong việc đạt được các cam kết bền vững của mình.
            </p>
            <p className="text-gray-600">
              Chúng tôi cũng hợp tác chặt chẽ với các đối tác, nhà cung cấp và cộng đồng địa phương để cùng nhau tạo ra
              tác động tích cực và lâu dài. Bằng cách làm việc cùng nhau, chúng tôi có thể đạt được nhiều hơn và xây
              dựng một tương lai bền vững hơn cho ngành du lịch.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Environment"
                alt="Environment"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Social"
                alt="Social"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Governance"
                alt="Governance"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Community"
                alt="Community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ESG Pillars */}
      <section className="py-16 px-4 md:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ba trụ cột ESG của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Môi trường</h3>
                <p className="text-gray-600 mb-4">
                  Chúng tôi cam kết giảm thiểu tác động môi trường của hoạt động kinh doanh và thúc đẩy du lịch bền vững
                  thông qua các sáng kiến như giảm thiểu rác thải, tiết kiệm năng lượng và bảo tồn tài nguyên thiên
                  nhiên.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Giảm 30% lượng khí thải carbon vào năm 2030</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Loại bỏ 100% nhựa dùng một lần trong văn phòng</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Trồng 1 triệu cây xanh vào năm 2030</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Xã hội</h3>
                <p className="text-gray-600 mb-4">
                  Chúng tôi đầu tư vào con người và cộng đồng, tạo ra môi trường làm việc đa dạng và hòa nhập, đồng thời
                  hỗ trợ các cộng đồng địa phương phát triển du lịch bền vững và bảo tồn văn hóa truyền thống.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Đạt tỷ lệ cân bằng giới tính 50:50 trong quản lý</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Hỗ trợ 100 dự án du lịch cộng đồng</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Trao 500 học bổng cho sinh viên ngành du lịch</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quản trị</h3>
                <p className="text-gray-600 mb-4">
                  Chúng tôi cam kết duy trì các tiêu chuẩn cao về đạo đức kinh doanh, minh bạch và trách nhiệm trong mọi
                  hoạt động. Chúng tôi tuân thủ các quy định pháp luật và áp dụng các thực hành quản trị tốt nhất.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <span>100% nhân viên được đào tạo về đạo đức kinh doanh</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Báo cáo phát triển bền vững hàng năm</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Tuân thủ 100% quy định về bảo vệ dữ liệu</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Chỉ số bền vững chính</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">85%</h3>
              <p className="text-gray-600">Tỷ lệ tái chế rác thải văn phòng</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">250,000+</h3>
              <p className="text-gray-600">Cây xanh đã trồng</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">45%</h3>
              <p className="text-gray-600">Tỷ lệ nữ giới trong quản lý</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5 tỷ VNĐ</h3>
              <p className="text-gray-600">Đóng góp cho cộng đồng năm 2024</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sustainability Initiatives */}
      <section id="initiatives" className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sáng kiến phát triển bền vững</h2>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="environment">Môi trường</TabsTrigger>
              <TabsTrigger value="social">Xã hội</TabsTrigger>
              <TabsTrigger value="governance">Quản trị</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sustainabilityInitiatives.map((initiative) => (
                  <Card key={initiative.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image src={initiative.image || "/placeholder.svg"} alt={initiative.title} fill className="object-cover" />
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={`${
                            initiative.category === "Môi trường"
                              ? "bg-green-600"
                              : initiative.category === "Xã hội"
                                ? "bg-blue-600"
                                : "bg-purple-600"
                          }`}
                        >
                          {initiative.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div
                          className={`p-2 rounded-full mr-2 ${
                            initiative.category === "Môi trường"
                              ? "bg-green-100"
                              : initiative.category === "Xã hội"
                                ? "bg-blue-100"
                                : "bg-purple-100"
                          }`}
                        >
                          {initiative.icon}
                        </div>
                        <h3 className="font-bold">{initiative.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{initiative.description}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tiến độ</span>
                          <span>{initiative.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              initiative.category === "Môi trường"
                                ? "bg-green-600"
                                : initiative.category === "Xã hội"
                                  ? "bg-blue-600"
                                  : "bg-purple-600"
                            }`}
                            style={{ width: `${initiative.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                        <Link href={`/sustainability/${initiative.id}`} className="flex items-center">
                          Tìm hiểu thêm <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="environment" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sustainabilityInitiatives
                  .filter((initiative) => initiative.category === "Môi trường")
                  .map((initiative) => (
                    <Card key={initiative.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={initiative.image || "/placeholder.svg"} alt={initiative.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-600">{initiative.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="bg-green-100 p-2 rounded-full mr-2">{initiative.icon}</div>
                          <h3 className="font-bold">{initiative.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{initiative.description}</p>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tiến độ</span>
                            <span>{initiative.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-green-600"
                              style={{ width: `${initiative.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                          <Link href={`/sustainability/${initiative.id}`} className="flex items-center">
                            Tìm hiểu thêm <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sustainabilityInitiatives
                  .filter((initiative) => initiative.category === "Xã hội")
                  .map((initiative) => (
                    <Card key={initiative.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={initiative.image || "/placeholder.svg"} alt={initiative.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-600">{initiative.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-100 p-2 rounded-full mr-2">{initiative.icon}</div>
                          <h3 className="font-bold">{initiative.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{initiative.description}</p>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tiến độ</span>
                            <span>{initiative.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{ width: `${initiative.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                          <Link href={`/sustainability/${initiative.id}`} className="flex items-center">
                            Tìm hiểu thêm <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="governance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sustainabilityInitiatives
                  .filter((initiative) => initiative.category === "Quản trị")
                  .map((initiative) => (
                    <Card key={initiative.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={initiative.image || "/placeholder.svg"} alt={initiative.title} fill className="object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-purple-600">{initiative.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="bg-purple-100 p-2 rounded-full mr-2">{initiative.icon}</div>
                          <h3 className="font-bold">{initiative.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-\
