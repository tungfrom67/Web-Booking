import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, Users, Coffee, Heart, Zap, BookOpen, Globe } from "lucide-react"

// Danh sách vị trí tuyển dụng mẫu
const jobOpenings = [
  {
    id: "fe-dev-1",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Hà Nội",
    type: "Full-time",
    experience: "2-4 năm",
    tags: ["React", "Next.js", "TypeScript"],
    isHot: true,
  },
  {
    id: "be-dev-1",
    title: "Backend Developer",
    department: "Engineering",
    location: "TP. Hồ Chí Minh",
    type: "Full-time",
    experience: "3-5 năm",
    tags: ["Node.js", "Express", "MongoDB"],
    isHot: true,
  },
  {
    id: "pm-1",
    title: "Product Manager",
    department: "Product",
    location: "Hà Nội",
    type: "Full-time",
    experience: "4+ năm",
    tags: ["Product Management", "Agile", "UX"],
    isHot: false,
  },
  {
    id: "ux-designer-1",
    title: "UX/UI Designer",
    department: "Design",
    location: "TP. Hồ Chí Minh",
    type: "Full-time",
    experience: "2-4 năm",
    tags: ["Figma", "UI Design", "User Research"],
    isHot: false,
  },
  {
    id: "marketing-1",
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Hà Nội",
    type: "Full-time",
    experience: "2-3 năm",
    tags: ["SEO", "SEM", "Social Media"],
    isHot: false,
  },
  {
    id: "cs-1",
    title: "Customer Support Specialist",
    department: "Customer Service",
    location: "Đà Nẵng",
    type: "Full-time",
    experience: "1-2 năm",
    tags: ["Customer Service", "Problem Solving"],
    isHot: false,
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="HotelBooking Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cùng xây dựng tương lai du lịch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Tham gia đội ngũ HotelBooking và góp phần định hình cách mọi người trải nghiệm du lịch
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="#open-positions">Xem vị trí đang tuyển</Link>
          </Button>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Tại sao nên gia nhập HotelBooking?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Công việc có tác động lớn</h3>
              <p className="text-gray-600">
                Tại HotelBooking, công việc của bạn sẽ tác động trực tiếp đến trải nghiệm của hàng triệu người dùng và
                đối tác trên toàn quốc. Mỗi ngày, bạn sẽ giúp kết nối mọi người với những trải nghiệm du lịch tuyệt vời.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Học hỏi và phát triển</h3>
              <p className="text-gray-600">
                Chúng tôi đầu tư vào sự phát triển của nhân viên thông qua các chương trình đào tạo, hội thảo và cơ hội
                học tập liên tục. Bạn sẽ được làm việc với những người giỏi nhất trong ngành và không ngừng nâng cao kỹ
                năng.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Văn hóa đa dạng</h3>
              <p className="text-gray-600">
                Chúng tôi tự hào về môi trường làm việc đa dạng và hòa nhập, nơi mọi ý tưởng đều được lắng nghe và đánh
                giá cao. Tại HotelBooking, bạn sẽ được là chính mình và đóng góp theo cách riêng của bạn.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Phúc lợi và đãi ngộ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Chăm sóc sức khỏe</h3>
              <p className="text-gray-600">
                Bảo hiểm y tế toàn diện cho bạn và gia đình, gói khám sức khỏe định kỳ, và các chương trình wellness.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Môi trường làm việc</h3>
              <p className="text-gray-600">
                Văn phòng hiện đại, không gian làm việc linh hoạt, đồ ăn nhẹ và đồ uống miễn phí, các hoạt động team
                building thường xuyên.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cân bằng công việc</h3>
              <p className="text-gray-600">
                Giờ làm việc linh hoạt, chính sách làm việc từ xa, nghỉ phép hào phóng, và các chương trình hỗ trợ sức
                khỏe tinh thần.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Phát triển sự nghiệp</h3>
              <p className="text-gray-600">
                Cơ hội thăng tiến rõ ràng, ngân sách học tập cá nhân, chương trình mentoring, và các khóa đào tạo chuyên
                sâu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Photos */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Không gian làm việc của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={`/placeholder.svg?height=400&width=600&text=Office+${index}`}
                alt={`Office Space ${index}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 px-4 md:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Vị trí đang tuyển dụng</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Chúng tôi luôn tìm kiếm những người tài năng và đam mê để gia nhập đội ngũ HotelBooking. Hãy khám phá các vị
            trí đang mở và tìm cơ hội phù hợp với bạn.
          </p>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="engineering">Kỹ thuật</TabsTrigger>
              <TabsTrigger value="design">Thiết kế</TabsTrigger>
              <TabsTrigger value="business">Kinh doanh</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOpenings.map((job) => (
                  <Link href={`/careers/${job.id}`} key={job.id}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          {job.isHot && <Badge className="bg-red-500">Hot</Badge>}
                        </div>
                        <div className="flex flex-wrap gap-y-2 mb-4">
                          <div className="flex items-center text-gray-600 text-sm mr-4">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mr-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">{job.experience} kinh nghiệm</span>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            Xem chi tiết
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="engineering" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOpenings
                  .filter((job) => job.department === "Engineering")
                  .map((job) => (
                    <Link href={`/careers/${job.id}`} key={job.id}>
                      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            {job.isHot && <Badge className="bg-red-500">Hot</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-y-2 mb-4">
                            <div className="flex items-center text-gray-600 text-sm mr-4">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mr-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">{job.experience} kinh nghiệm</span>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              Xem chi tiết
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOpenings
                  .filter((job) => job.department === "Design")
                  .map((job) => (
                    <Link href={`/careers/${job.id}`} key={job.id}>
                      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            {job.isHot && <Badge className="bg-red-500">Hot</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-y-2 mb-4">
                            <div className="flex items-center text-gray-600 text-sm mr-4">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mr-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">{job.experience} kinh nghiệm</span>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              Xem chi tiết
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOpenings
                  .filter(
                    (job) =>
                      job.department === "Marketing" ||
                      job.department === "Product" ||
                      job.department === "Customer Service",
                  )
                  .map((job) => (
                    <Link href={`/careers/${job.id}`} key={job.id}>
                      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            {job.isHot && <Badge className="bg-red-500">Hot</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-y-2 mb-4">
                            <div className="flex items-center text-gray-600 text-sm mr-4">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mr-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">{job.experience} kinh nghiệm</span>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              Xem chi tiết
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Không tìm thấy vị trí phù hợp? Gửi CV của bạn cho chúng tôi!</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/careers/apply">Ứng tuyển ngay</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nhân viên nói gì về chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Nguyễn Văn X",
              position: "Senior Frontend Developer",
              years: "3 năm",
              quote:
                "Làm việc tại HotelBooking là trải nghiệm tuyệt vời nhất trong sự nghiệp của tôi. Tôi được tự do sáng tạo, học hỏi từ những đồng nghiệp tài năng và cùng nhau tạo ra sản phẩm có tác động lớn.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Trần Thị Y",
              position: "Product Manager",
              years: "2 năm",
              quote:
                "Điều tôi yêu thích nhất ở HotelBooking là văn hóa công ty. Mọi người đều nhiệt tình, hỗ trợ lẫn nhau và cùng hướng đến mục tiêu chung. Tôi thực sự cảm thấy mình là một phần của gia đình lớn.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Lê Văn Z",
              position: "UX Designer",
              years: "1.5 năm",
              quote:
                "HotelBooking thực sự quan tâm đến sự phát triển của nhân viên. Tôi đã được tham gia nhiều khóa đào tạo, hội thảo và có cơ hội làm việc với những dự án thú vị, giúp tôi không ngừng nâng cao kỹ năng.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position} • {testimonial.years}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn sàng cho thử thách mới?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Hãy tham gia đội ngũ HotelBooking và cùng chúng tôi định hình tương lai của ngành du lịch và lưu trú.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="#open-positions">Khám phá cơ hội nghề nghiệp</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
