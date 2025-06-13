"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown, Menu, X, User, HelpCircle, DollarSign } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 text-2xl font-bold">Henry XII</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>Tiếng Việt</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>中文</DropdownMenuItem>
                  <DropdownMenuItem>日本語</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Currency Selector */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>VND</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>VND</DropdownMenuItem>
                  <DropdownMenuItem>USD</DropdownMenuItem>
                  <DropdownMenuItem>EUR</DropdownMenuItem>
                  <DropdownMenuItem>JPY</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Help */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button variant="ghost" size="sm" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-1" />
                <span>Trợ giúp</span>
              </Button>
            </motion.div>

            {/* Register Property */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Button variant="outline" size="sm">
                Đăng ký chỗ nghỉ
              </Button>
            </motion.div>

            {/* Login/Register */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/login">
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <User className="h-4 w-4 mr-1" />
                  <span>Đăng nhập / Đăng ký</span>
                </Button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.div
            className="md:hidden flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/*  />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
              <Link href="/auth/login">
                <Button variant="default" size="sm" className="w-full justify-start bg-blue-600 hover:bg-blue-700 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  <span>Đăng nhập / Đăng ký</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                <span>Tiếng Việt</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>VND</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>Trợ giúp</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Đăng ký chỗ nghỉ
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
