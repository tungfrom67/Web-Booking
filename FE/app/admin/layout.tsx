"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Hotel,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  Bot,
  ChevronDown,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Bed,
  Globe,
  Tag,
  CreditCard,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Cấu trúc menu phân cấp với links đầy đủ
const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
    badge: null,
  },
  {
    icon: Globe,
    label: "Quản lý địa điểm",
    href: "/admin/locations",
    badge: null,
    submenu: [
      { label: "Quốc gia", href: "/admin/locations/countries" },
      { label: "Thành phố", href: "/admin/locations/cities" },
      { label: "Khu vực", href: "/admin/locations/areas" },
    ],
  },
  {
    icon: Hotel,
    label: "Khách sạn",
    href: "/admin/hotels",
    badge: "12",
    submenu: [
      { label: "Tất cả khách sạn", href: "/admin/hotels" },
      { label: "Thêm khách sạn", href: "/admin/hotels/add" },
      { label: "Phân loại", href: "/admin/hotels/categories" },
      { label: "Tiện nghi", href: "/admin/hotels/amenities" },
    ],
  },
  {
    icon: Bed,
    label: "Quản lý phòng",
    href: "/admin/rooms",
    badge: "8",
    submenu: [
      { label: "Tất cả phòng", href: "/admin/rooms" },
      { label: "Loại phòng", href: "/admin/rooms/types" },
      { label: "Tiện nghi phòng", href: "/admin/rooms/amenities" },
      { label: "Giá phòng", href: "/admin/rooms/pricing" },
    ],
  },
  {
    icon: Calendar,
    label: "Đặt phòng",
    href: "/admin/bookings",
    badge: "5",
    submenu: [
      { label: "Tất cả đặt phòng", href: "/admin/bookings" },
      { label: "Đặt phòng mới", href: "/admin/bookings/new" },
      { label: "Đã xác nhận", href: "/admin/bookings/confirmed" },
      { label: "Đã hủy", href: "/admin/bookings/cancelled" },
    ],
  },
  {
    icon: Users,
    label: "Khách hàng",
    href: "/admin/customers",
    badge: null,
    submenu: [
      { label: "Tất cả khách hàng", href: "/admin/customers" },
      { label: "Khách hàng VIP", href: "/admin/customers/vip" },
      { label: "Loyalty Program", href: "/admin/customers/loyalty" },
    ],
  },
  {
    icon: MessageSquare,
    label: "Đánh giá",
    href: "/admin/reviews",
    badge: "2",
  },
  {
    icon: Tag,
    label: "Khuyến mãi",
    href: "/admin/promotions",
    badge: null,
    submenu: [
      { label: "Mã giảm giá", href: "/admin/promotions/coupons" },
      { label: "Ưu đãi đặc biệt", href: "/admin/promotions/special" },
      { label: "Deal nhanh", href: "/admin/promotions/flash" },
    ],
  },
  {
    icon: CreditCard,
    label: "Thanh toán",
    href: "/admin/payments",
    badge: null,
    submenu: [
      { label: "Giao dịch", href: "/admin/payments/transactions" },
      { label: "Phương thức", href: "/admin/payments/methods" },
      { label: "Hoàn tiền", href: "/admin/payments/refunds" },
    ],
  },
  {
    icon: BarChart3,
    label: "Thống kê",
    href: "/admin/analytics",
    badge: null,
    submenu: [
      { label: "Tổng quan", href: "/admin/analytics" },
      { label: "Doanh thu", href: "/admin/analytics/revenue" },
      { label: "Báo cáo", href: "/admin/analytics/reports" },
    ],
  },
  {
    icon: ImageIcon,
    label: "Nội dung",
    href: "/admin/content",
    badge: null,
    submenu: [
      { label: "Hình ảnh", href: "/admin/content/images" },
      { label: "Banner", href: "/admin/content/banners" },
      { label: "Trang tĩnh", href: "/admin/content/pages" },
    ],
  },
  {
    icon: Bot,
    label: "AI Assistant",
    href: "/admin/ai",
    badge: "NEW",
  },
  {
    icon: Settings,
    label: "Cài đặt",
    href: "/admin/settings",
    badge: null,
    submenu: [
      { label: "Chung", href: "/admin/settings" },
      { label: "Người dùng", href: "/admin/settings/users" },
      { label: "Quyền hạn", href: "/admin/settings/permissions" },
      { label: "Thông báo", href: "/admin/settings/notifications" },
    ],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({})
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    // Mở submenu cho trang hiện tại
    sidebarItems.forEach((item) => {
      if (item.submenu && item.submenu.some((subitem) => pathname === subitem.href)) {
        setOpenSubmenus((prev) => ({ ...prev, [item.label]: true }))
      }
    })
  }, [pathname])

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 80 : 280,
          x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -280,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 shadow-lg lg:relative lg:z-auto",
          sidebarCollapsed ? "w-20" : "w-70",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Henry XII
                  </h1>
                  <p className="text-xs text-gray-500">Management Portal</p>
                </div>
              </div>
            )}

            {/* Mobile close button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>

            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item, index) => {
              const isActive =
                pathname === item.href || (item.submenu && item.submenu.some((subitem) => pathname === subitem.href))
              const hasSubmenu = item.submenu && item.submenu.length > 0
              const isSubmenuOpen = openSubmenus[item.label]

              return (
                <div key={item.href + index}>
                  {hasSubmenu ? (
                    <div className="mb-1">
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700",
                          sidebarCollapsed && "justify-center",
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                        </div>

                        {!sidebarCollapsed && hasSubmenu && (
                          <ChevronDown
                            className={cn("w-4 h-4 transition-transform", isSubmenuOpen ? "transform rotate-180" : "")}
                          />
                        )}

                        {item.badge && !sidebarCollapsed && (
                          <Badge variant={item.badge === "NEW" ? "default" : "secondary"} className="ml-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </button>

                      {/* Submenu */}
                      {!sidebarCollapsed && hasSubmenu && isSubmenuOpen && (
                        <div className="mt-1 ml-4 pl-4 border-l border-gray-200 space-y-1">
                          {item.submenu.map((subitem, subindex) => {
                            const isSubActive = pathname === subitem.href
                            return (
                              <Link
                                key={subitem.href + subindex}
                                href={subitem.href}
                                className={cn(
                                  "flex items-center px-3 py-2 rounded-lg text-sm transition-colors",
                                  isSubActive
                                    ? "bg-blue-50 text-blue-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                )}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                                {subitem.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700",
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <>
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant={item.badge === "NEW" ? "default" : "secondary"} className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-3">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium">Admin User</p>
                      <p className="text-xs text-gray-500">admin@henry12.com</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 w-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">Henry XII</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
