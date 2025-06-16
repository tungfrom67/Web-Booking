import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Download, Calendar, Users, Globe, BarChart, PieChart, FileText, Mail } from "lucide-react"

// Dữ liệu báo cáo tài chính mẫu
const financialReports = [
  {
    id: "q1-2025",
    title: "Báo cáo tài chính Quý 1/2025",
    date: "15/04/2025",
    type: "quarterly",
    fileSize: "2.5 MB",
  },
  {
    id: "q4-2024",
    title: "Báo cáo tài chính Quý 4/2024",
    date: "15/01/2025",
    type: "quarterly",
    fileSize: "2.3 MB",
  },
  {
    id: "q3-2024",
    title: "Báo cáo tài chính Quý 3/2024",
    date: "15/10/2024",
    type: "quarterly",
    fileSize: "2.4 MB",
  },
  {
    id: "q2-2024",
    title: "Báo cáo tài chính Quý 2/2024",
    date: "15/07/2024",
    type: "quarterly",
    fileSize: "2.2 MB",
  },
  {
    id: "annual-2024",
    title: "Báo cáo tài chính năm 2024",
    date: "15/03/2025",
    type: "annual",
    fileSize: "5.8 MB",
  },
  {
    id: "annual-2023",
    title: "Báo cáo tài chính năm 2023",
    date: "15/03/2024",
    type: "annual",
    fileSize: "5.5 MB",
  },
]

// Dữ liệu thông báo cổ đông mẫu
const shareholderAnnouncements = [
  {
    id: "ann-1",
    title: "Thông báo về việc chi trả cổ tức năm 2024",
    date: "20/04/2025",
    summary: "HotelBooking thông báo chi trả cổ tức năm 2024 với tỷ lệ 15% mệnh giá cổ phiếu.",
  },
  {
    id: "ann-2",
    title: "Thông báo về việc tổ chức Đại hội đồng cổ đông thường niên 2025",
    date: "15/03/2025",
    summary:
      "HotelBooking sẽ tổ chức Đại hội đồng cổ đông thường niên 2025 vào ngày 25/04/2025 tại Khách sạn Sheraton Hà Nội.",
  },
  {
    id: "ann-3",
    title: "Thông báo về việc phát hành cổ phiếu ESOP cho nhân viên",
    date: "10/02/2025",
    summary:
      "HotelBooking thông báo phát hành 500,000 cổ phiếu theo chương trình lựa chọn cho người lao động (ESOP) năm 2025.",
  },
  {
    id: "ann-4",
    title: "Thông báo về việc thay đổi nhân sự cấp cao",
    date: "05/01/2025",
    summary: "HotelBooking thông báo bổ nhiệm ông Nguyễn Văn A làm Giám đốc Tài chính (CFO) từ ngày 01/02/2025.",
  },
]

export default function InvestorRelationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="HotelBooking Investors"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quan hệ nhà đầu tư</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Thông tin tài chính và cơ hội đầu tư vào HotelBooking - nền tảng đặt phòng hàng đầu Việt Nam
          </p>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Chỉ số tài chính nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-600">Doanh thu</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold mb-2">1,250 tỷ VNĐ</p>
              <p className="text-sm text-green-600 font-medium">+25% so với năm trước</p>
              <p className="text-xs text-gray-500 mt-2">Cập nhật: Q1/2025</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-600">Lợi nhuận</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold mb-2">320 tỷ VNĐ</p>
              <p className="text-sm text-green-600 font-medium">+18% so với năm trước</p>
              <p className="text-xs text-gray-500 mt-2">Cập nhật: Q1/2025</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-600">Người dùng</h3>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold mb-2">5 triệu+</p>
              <p className="text-sm text-green-600 font-medium">+30% so với năm trước</p>
              <p className="text-xs text-gray-500 mt-2">Cập nhật: Q1/2025</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-600">Đối tác</h3>
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold mb-2">50,000+</p>
              <p className="text-sm text-green-600 font-medium">+15% so với năm trước</p>
              <p className="text-xs text-gray-500 mt-2">Cập nhật: Q1/2025</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stock Information */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Thông tin cổ phiếu</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg col-span-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Biểu đồ giá cổ phiếu</h3>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <BarChart className="h-12 w-12 text-gray-400" />
                  <span className="ml-2 text-gray-500">Biểu đồ giá cổ phiếu sẽ hiển thị ở đây</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      1T
                    </Button>
                    <Button variant="outline" size="sm">
                      3T
                    </Button>
                    <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200">
                      6T
                    </Button>
                    <Button variant="outline" size="sm">
                      1N
                    </Button>
                    <Button variant="outline" size="sm">
                      5N
                    </Button>
                    <Button variant="outline" size="sm">
                      Tất cả
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Tải xuống
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Thông tin giao dịch</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Mã cổ phiếu</span>
                    <span className="font-bold">HBK</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Sàn giao dịch</span>
                    <span className="font-bold">HOSE</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Giá hiện tại</span>
                    <span className="font-bold text-green-600">85,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Thay đổi</span>
                    <span className="font-bold text-green-600">+2,500 VNĐ (+3.03%)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Khối lượng</span>
                    <span className="font-bold">1.2M</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Vốn hóa</span>
                    <span className="font-bold">8,500 tỷ VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cập nhật</span>
                    <span className="text-sm text-gray-500">15:30, 19/05/2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Reports */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Báo cáo tài chính</h2>

        <Tabs defaultValue="quarterly" className="mb-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="quarterly">Báo cáo quý</TabsTrigger>
            <TabsTrigger value="annual">Báo cáo năm</TabsTrigger>
            <TabsTrigger value="presentations">Thuyết trình</TabsTrigger>
          </TabsList>

          <TabsContent value="quarterly" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialReports
                .filter((report) => report.type === "quarterly")
                .map((report) => (
                  <Card key={report.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{report.title}</h3>
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{report.date}</span>
                            <span className="mx-2">•</span>
                            <span>{report.fileSize}</span>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Tải xuống PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="annual" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialReports
                .filter((report) => report.type === "annual")
                .map((report) => (
                  <Card key={report.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{report.title}</h3>
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{report.date}</span>
                            <span className="mx-2">•</span>
                            <span>{report.fileSize}</span>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Tải xuống PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="presentations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "pres-1",
                  title: "Thuyết trình kết quả kinh doanh Q1/2025",
                  date: "20/04/2025",
                  fileSize: "15.2 MB",
                },
                {
                  id: "pres-2",
                  title: "Thuyết trình chiến lược phát triển 2025-2030",
                  date: "15/03/2025",
                  fileSize: "18.5 MB",
                },
              ].map((presentation) => (
                <Card key={presentation.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <PieChart className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{presentation.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{presentation.date}</span>
                          <span className="mx-2">•</span>
                          <span>{presentation.fileSize}</span>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Tải xuống PDF
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
            <Link href="/investor-relations/reports">Xem tất cả báo cáo tài chính</Link>
          </Button>
        </div>
      </section>

      {/* IR Contact */}
      <section className="py-12 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Liên hệ Quan hệ Nhà đầu tư</h2>
              <p className="max-w-xl">
                Nếu bạn có bất kỳ câu hỏi nào liên quan đến thông tin tài chính hoặc cơ hội đầu tư vào HotelBooking, vui
                lòng liên hệ với chúng tôi.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="mr-2 h-4 w-4" />
                <Link href="mailto:ir@hotelbooking.vn">ir@hotelbooking.vn</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-blue-700">
                <Link href="/investor-relations/contact">Gửi yêu cầu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
