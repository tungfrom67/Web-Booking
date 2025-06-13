"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const bannerImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=800&width=1600",
    alt: "Bãi biển Đà Nẵng",
    title: "Khám phá bãi biển Đà Nẵng",
    subtitle: "Một trong những bãi biển đẹp nhất thế giới",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=1600",
    alt: "Phú Quốc",
    title: "Thiên đường Phú Quốc",
    subtitle: "Hòn đảo ngọc với làn nước trong xanh",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=800&width=1600",
    alt: "Hạ Long",
    title: "Vịnh Hạ Long huyền bí",
    subtitle: "Di sản thiên nhiên thế giới UNESCO",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=1600",
    alt: "Hội An",
    title: "Phố cổ Hội An",
    subtitle: "Thành phố của đèn lồng và di sản văn hóa",
  },
]

export function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1))
  }, [])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, goToNext])

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <div
      className="relative h-[500px] md:h-[600px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={bannerImages[currentIndex].src || "/placeholder.svg"}
            alt={bannerImages[currentIndex].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {bannerImages[currentIndex].title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {bannerImages[currentIndex].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg">
                Khám phá ngay
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white z-10"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white z-10"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
