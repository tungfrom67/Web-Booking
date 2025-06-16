import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Globe, TrendingUp, Heart, Clock, Building } from "lucide-react"

export default function AboutPage() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Về HotelBooking</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Kết nối du khách với những trải nghiệm lưu trú tuyệt vời trên toàn thế giới
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
            <p className="text-gray-600 mb-4">
              HotelBooking được thành lập vào năm 2010 với sứ mệnh đơn giản: giúp mọi người dễ dàng tìm kiếm và đặt chỗ
              nghỉ lý tưởng cho chuyến đi của họ. Từ một startup nhỏ với vài nhân viên, chúng tôi đã phát triển thành
              một trong những nền tảng đặt phòng hàng đầu tại Việt Nam.
            </p>
            <p className="text-gray-600 mb-4">
              Với hơn 10 năm kinh nghiệm, chúng tôi tự hào kết nối hàng triệu du khách với hơn 50,000 chỗ nghỉ trên khắp
              Việt Nam và quốc tế. Chúng tôi không ngừng đổi mới để mang đến trải nghiệm đặt phòng đơn giản, an toàn và
              tiết kiệm nhất cho người dùng.
            </p>
            <p className="text-gray-600">
              Tầm nhìn của chúng tôi là trở thành nền tảng du lịch được yêu thích nhất tại Đông Nam Á, nơi mọi người có
              thể tìm thấy và đặt chỗ nghỉ hoàn hảo cho mọi chuyến đi, dù là chuyến công tác hay kỳ nghỉ dưỡng.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image src="/placeholder.svg?height=600&width=800" alt="HotelBooking Team" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-16 px-4 md:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">HotelBooking trong con số</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">50,000+</h3>
                <p className="text-gray-600">Chỗ nghỉ đối tác</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">5 triệu+</h3>
                <p className="text-gray-600">Người dùng hàng tháng</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">63/63</h3>
                <p className="text-gray-600">Tỉnh thành phủ sóng</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">96%</h3>
                <p className="text-gray-600">Khách hàng hài lòng</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Khách hàng là trọng tâm</h3>
              <p className="text-gray-600">
                Chúng tôi đặt nhu cầu và trải nghiệm của khách hàng lên hàng đầu trong mọi quyết định. Sự hài lòng của
                khách hàng là thước đo thành công của chúng tôi.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Đổi mới liên tục</h3>
              <p className="text-gray-600">
                Chúng tôi không ngừng cải tiến sản phẩm và dịch vụ để mang đến trải nghiệm tốt nhất cho người dùng và
                đối tác. Công nghệ và sáng tạo là động lực phát triển của chúng tôi.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tin cậy và minh bạch</h3>
              <p className="text-gray-600">
                Chúng tôi cam kết xây dựng mối quan hệ dựa trên sự tin cậy và minh bạch với khách hàng, đối tác và nhân
                viên. Chúng tôi luôn giữ lời hứa và hành động chính trực.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Đội ngũ lãnh đạo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                position: "Tổng Giám đốc",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Trần Thị B",
                position: "Giám đốc Công nghệ",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Lê Văn C",
                position: "Giám đốc Tài chính",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Phạm Thị D",
                position: "Giám đốc Marketing",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((leader, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                <p className="text-gray-600">{leader.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Hãy trở thành một phần của HotelBooking</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Dù bạn là khách du lịch đang tìm kiếm chỗ nghỉ hoàn hảo hay chủ khách sạn muốn mở rộng kinh doanh, chúng tôi
            luôn sẵn sàng hỗ trợ bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/auth/register">Đăng ký tài khoản</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              <Link href="/partner/register">Trở thành đối tác</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
