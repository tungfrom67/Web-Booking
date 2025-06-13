import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Về HotelBooking</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white">
                  Báo chí
                </Link>
              </li>
              <li>
                <Link href="/investor-relations" className="hover:text-white">
                  Quan hệ nhà đầu tư
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-white">
                  Phát triển bền vững
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Partner Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Đối tác</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/partner/register" className="hover:text-white">
                  Đăng ký chỗ nghỉ
                </Link>
              </li>
              <li>
                <Link href="/partner/login" className="hover:text-white">
                  Đăng nhập đối tác
                </Link>
              </li>
              <li>
                <Link href="/partner/resources" className="hover:text-white">
                  Trung tâm tài nguyên
                </Link>
              </li>
              <li>
                <Link href="/partner/support" className="hover:text-white">
                  Hỗ trợ đối tác
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-white">
                  Chương trình liên kết
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ khách hàng</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-white">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Apps */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="https://facebook.com" className="hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com" className="hover:text-white">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>

            <h3 className="text-lg font-semibold mb-4">Tải ứng dụng</h3>
            <div className="flex flex-col space-y-2">
              <Link href="https://apps.apple.com" className="hover:text-white flex items-center">
                <span className="mr-2">iOS App</span>
              </Link>
              <Link href="https://play.google.com" className="hover:text-white flex items-center">
                <span className="mr-2">Android App</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 HotelBooking. Tất cả các quyền được bảo lưu.</p>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <span>Tiếng Việt (Việt Nam)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
