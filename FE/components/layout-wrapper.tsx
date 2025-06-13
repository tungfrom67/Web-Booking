"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  if (isAdminRoute) {
    // Admin routes không có header và footer
    return <>{children}</>
  }

  // Các trang khác có header và footer bình thường
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
