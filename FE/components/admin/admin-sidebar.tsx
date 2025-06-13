"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Users,
  Star,
  BarChart3,
  Settings,
  Bot,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LogOut,
  Globe,
  Bed,
  CreditCard,
  Gift,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Đặt phòng",
    href: "/admin/bookings",
    icon: Calendar,
    badge: "5",
    submenu: [
      { name: "Tất cả đặt phòng", href: "/admin/bookings" },
      { name: "Đặt phòng mới", href: "/admin/bookings/new" },
      { name: "Đã xác nhận", href: "/admin/bookings/confirmed" },
      { name: "Đã hủy", href: "/admin/bookings/cancelled" },
    ],
  },
  {
    name: "Khách hàng",
    href: "/admin/customers",
    icon: Users,
    badge: null,
    submenu: [
      { name: "Tất cả khách hàng", href: "/admin/customers" },
      { name: "Khách hàng VIP", href: "/admin/customers/vip" },
      { name: "Loyalty Program", href: "/admin/customers/loyalty" },
    ],
  },
  {
    name: "Đánh giá",
    href: "/admin/reviews",
    icon: Star,
    badge: "2",
  },
  {
    name: "Khuyến mãi",
    href: "/admin/promotions",
    icon: Gift,
    badge: null,
    submenu: [
      { name: "Mã giảm giá", href: "/admin/promotions/coupons" },
      { name: "Ưu đãi đặc biệt", href: "/admin/promotions/special" },
      { name: "Deal nhanh", href: "/admin/promotions/flash" },
    ],
  },
  {
    name: "Quản lý địa điểm",
    href: "/admin/locations",
    icon: Globe,
    badge: null,
    submenu: [
      { name: "Quốc gia", href: "/admin/locations/countries" },
      { name: "Thành phố", href: "/admin/locations/cities" },
      { name: "Khu vực", href: "/admin/locations/areas" },
    ],
  },
  {
    name: "Khách sạn",
    href: "/admin/hotels",
    icon: Building2,
    badge: "12",
    submenu: [
      { name: "Tất cả khách sạn", href: "/admin/hotels" },
      { name: "Thêm khách sạn", href: "/admin/hotels/new" },
      { name: "Phân loại", href: "/admin/hotels/categories" },
      { name: "Tiện nghi", href: "/admin/hotels/amenities" },
    ],
  },
  {
    name: "Quản lý phòng",
    href: "/admin/rooms",
    icon: Bed,
    badge: "8",
    submenu: [
      { name: "Tất cả phòng", href: "/admin/rooms" },
      { name: "Loại phòng", href: "/admin/rooms/types" },
      { name: "Tiện nghi phòng", href: "/admin/rooms/amenities" },
      { name: "Giá phòng", href: "/admin/rooms/pricing" },
    ],
  },
  {
    name: "Thanh toán",
    href: "/admin/payments",
    icon: CreditCard,
    badge: null,
    submenu: [
      { name: "Giao dịch", href: "/admin/payments/transactions" },
      { name: "Phương thức", href: "/admin/payments/methods" },
      { name: "Hoàn tiền", href: "/admin/payments/refunds" },
    ],
  },
  {
    name: "Thống kê",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
    submenu: [
      { name: "Tổng quan", href: "/admin/analytics" },
      { name: "Doanh thu", href: "/admin/analytics/revenue" },
      { name: "Báo cáo", href: "/admin/analytics/reports" },
    ],
  },
  {
    name: "Nội dung",
    href: "/admin/content",
    icon: ImageIcon,
    badge: null,
    submenu: [
      { name: "Hình ảnh", href: "/admin/content/images" },
      { name: "Banner", href: "/admin/content/banners" },
      { name: "Trang tĩnh", href: "/admin/content/pages" },
    ],
  },
  {
    name: "AI Assistant",
    href: "/admin/ai",
    icon: Bot,
    badge: "NEW",
  },
  {
    name: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
    submenu: [
      { name: "Chung", href: "/admin/settings" },
      { name: "Người dùng", href: "/admin/settings/users" },
      { name: "Quyền hạn", href: "/admin/settings/permissions" },
      { name: "Thông báo", href: "/admin/settings/notifications" },
    ],
  },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName],
    )
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 h-screen",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Henry XII</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.submenu && item.submenu.some((sub) => pathname === sub.href))
          const isExpanded = expandedMenus.includes(item.name)
          const hasSubmenu = item.submenu && item.submenu.length > 0

          return (
            <div key={item.name}>
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                )}
                onClick={() => {
                  if (hasSubmenu) {
                    toggleSubmenu(item.name)
                  } else {
                    // Navigate to single page
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant={item.badge === "NEW" ? "default" : "secondary"} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                {!collapsed && hasSubmenu && (
                  <div className="ml-auto">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                )}
              </div>

              {/* Submenu */}
              {!collapsed && hasSubmenu && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        pathname === subItem.href
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50",
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  )
}
