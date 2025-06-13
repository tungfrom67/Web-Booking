"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Calendar, Heart, Star, Settings, LogOut, Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { icon: <User size={20} />, label: "Thông tin cá nhân", path: "/user/profile" },
    { icon: <Calendar size={20} />, label: "Đặt phòng của tôi", path: "/user/bookings", badge: "3" },
    { icon: <Heart size={20} />, label: "Yêu thích", path: "/user/favorites", badge: "12" },
    { icon: <Star size={20} />, label: "Đánh giá của tôi", path: "/user/reviews" },
    { icon: <Settings size={20} />, label: "Cài đặt", path: "/user/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu />
              </Button>
              <Link href="/" className="text-xl font-bold text-blue-600">
                HotelBooking
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  2
                </Badge>
              </Button>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>NV</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Nguyễn Văn A</p>
                  <p className="text-xs text-gray-500">VIP Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 transform lg:relative lg:translate-x-0 lg:w-64 lg:shadow-none lg:bg-transparent ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6 lg:p-0">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-lg font-bold">Tài khoản của tôi</h2>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X />
                </Button>
              </div>

              {/* User info card */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6 lg:block hidden">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="text-lg">NV</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">Nguyễn Văn A</h3>
                    <p className="text-gray-600">nguyenvana@email.com</p>
                    <Badge variant="secondary" className="mt-1">
                      VIP Member
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-500">Đặt phòng</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-xs text-gray-500">Đánh giá</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">24</div>
                    <div className="text-xs text-gray-500">Điểm thưởng</div>
                  </div>
                </div>
              </div>

              {/* Navigation menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t">
                  <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
                    <LogOut size={20} />
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 lg:ml-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
