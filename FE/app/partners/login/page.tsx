import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeOff, Lock, Mail } from "lucide-react"

export default function PartnerLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            HotelBooking
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/partners/register" className="text-gray-600 hover:text-blue-600">
              Đăng ký chỗ nghỉ
            </Link>
            <Link href="/partners/help" className="text-gray-600 hover:text-blue-600">
              Trợ giúp
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Đăng nhập đối tác</h1>
            <p className="text-gray-600">Quản lý chỗ nghỉ của bạn trên HotelBooking</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="email" className="mb-6">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="mt-4">
                  <form>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input id="email" type="email" placeholder="email@example.com" className="pl-10" required />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                          Mật khẩu
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            <EyeOff className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <label htmlFor="remember" className="text-sm text-gray-600">
                            Ghi nhớ đăng nhập
                          </label>
                        </div>
                        <Link href="/partners/forgot-password" className="text-sm text-blue-600 hover:underline">
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Đăng nhập
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="phone" className="mt-4">
                  <form>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Số điện thoại
                        </label>
                        <Input id="phone" type="tel" placeholder="+84 xxx xxx xxx" required />
                      </div>
                      <div>
                        <label htmlFor="password-phone" className="block text-sm font-medium mb-1">
                          Mật khẩu
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="password-phone"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            <EyeOff className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember-phone" />
                          <label htmlFor="remember-phone" className="text-sm text-gray-600">
                            Ghi nhớ đăng nhập
                          </label>
                        </div>
                        <Link href="/partners/forgot-password" className="text-sm text-blue-600 hover:underline">
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Đăng nhập
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Google"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Facebook
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?{" "}
                  <Link href="/partners/register" className="text-blue-600 hover:underline font-medium">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 HotelBooking. Tất cả các quyền được bảo lưu.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/terms" className="hover:text-blue-600">
                Điều khoản sử dụng
              </Link>
              <Link href="/privacy" className="hover:text-blue-600">
                Chính sách bảo mật
              </Link>
              <Link href="/partners/help" className="hover:text-blue-600">
                Trợ giúp
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
