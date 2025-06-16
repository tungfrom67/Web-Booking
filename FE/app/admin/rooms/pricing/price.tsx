"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, CalendarIcon, TrendingUp, TrendingDown } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface RoomPricing {
  id: string
  roomType: string
  hotelName: string
  basePrice: number
  weekendPrice: number
  holidayPrice: number
  seasonalMultiplier: number
  startDate: Date
  endDate: Date
  isActive: boolean
  currency: string
  createdAt: string
}

export default function RoomPricingPage() {
  const [pricings, setPricings] = useState<RoomPricing[]>([
    {
      id: "1",
      roomType: "Deluxe Room",
      hotelName: "Grand Hotel Saigon",
      basePrice: 1500000,
      weekendPrice: 1800000,
      holidayPrice: 2200000,
      seasonalMultiplier: 1.2,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      isActive: true,
      currency: "VND",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      roomType: "Superior Room",
      hotelName: "Grand Hotel Saigon",
      basePrice: 1200000,
      weekendPrice: 1400000,
      holidayPrice: 1700000,
      seasonalMultiplier: 1.1,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      isActive: true,
      currency: "VND",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      roomType: "Suite Room",
      hotelName: "Luxury Resort Danang",
      basePrice: 3000000,
      weekendPrice: 3500000,
      holidayPrice: 4200000,
      seasonalMultiplier: 1.5,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      isActive: true,
      currency: "VND",
      createdAt: "2024-01-15",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPricing, setEditingPricing] = useState<RoomPricing | null>(null)
  const [formData, setFormData] = useState({
    roomType: "",
    hotelName: "",
    basePrice: 0,
    weekendPrice: 0,
    holidayPrice: 0,
    seasonalMultiplier: 1,
    startDate: new Date(),
    endDate: new Date(),
    currency: "VND",
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPricing) {
      setPricings((prev) =>
        prev.map((pricing) => (pricing.id === editingPricing.id ? { ...pricing, ...formData } : pricing)),
      )
    } else {
      const newPricing: RoomPricing = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setPricings((prev) => [...prev, newPricing])
    }

    setIsDialogOpen(false)
    setEditingPricing(null)
    setFormData({
      roomType: "",
      hotelName: "",
      basePrice: 0,
      weekendPrice: 0,
      holidayPrice: 0,
      seasonalMultiplier: 1,
      startDate: new Date(),
      endDate: new Date(),
      currency: "VND",
    })
  }

  const handleEdit = (pricing: RoomPricing) => {
    setEditingPricing(pricing)
    setFormData({
      roomType: pricing.roomType,
      hotelName: pricing.hotelName,
      basePrice: pricing.basePrice,
      weekendPrice: pricing.weekendPrice,
      holidayPrice: pricing.holidayPrice,
      seasonalMultiplier: pricing.seasonalMultiplier,
      startDate: pricing.startDate,
      endDate: pricing.endDate,
      currency: pricing.currency,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPricings((prev) => prev.filter((pricing) => pricing.id !== id))
  }

  const toggleActive = (id: string) => {
    setPricings((prev) =>
      prev.map((pricing) => (pricing.id === id ? { ...pricing, isActive: !pricing.isActive } : pricing)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý giá phòng</h1>
          <p className="text-muted-foreground">Thiết lập và quản lý giá phòng theo thời gian</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPricing(null)
                setFormData({
                  roomType: "",
                  hotelName: "",
                  basePrice: 0,
                  weekendPrice: 0,
                  holidayPrice: 0,
                  seasonalMultiplier: 1,
                  startDate: new Date(),
                  endDate: new Date(),
                  currency: "VND",
                })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm bảng giá
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPricing ? "Chỉnh sửa bảng giá" : "Thêm bảng giá mới"}</DialogTitle>
              <DialogDescription>
                {editingPricing ? "Cập nhật thông tin bảng giá" : "Tạo bảng giá mới cho phòng"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hotelName">Khách sạn *</Label>
                  <Select
                    value={formData.hotelName}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, hotelName: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khách sạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grand Hotel Saigon">Grand Hotel Saigon</SelectItem>
                      <SelectItem value="Luxury Resort Danang">Luxury Resort Danang</SelectItem>
                      <SelectItem value="Beach Resort Phu Quoc">Beach Resort Phu Quoc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roomType">Loại phòng *</Label>
                  <Select
                    value={formData.roomType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, roomType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard Room">Standard Room</SelectItem>
                      <SelectItem value="Superior Room">Superior Room</SelectItem>
                      <SelectItem value="Deluxe Room">Deluxe Room</SelectItem>
                      <SelectItem value="Suite Room">Suite Room</SelectItem>
                      <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="basePrice">Giá cơ bản (VND) *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, basePrice: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="1500000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="weekendPrice">Giá cuối tuần (VND)</Label>
                  <Input
                    id="weekendPrice"
                    type="number"
                    value={formData.weekendPrice}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, weekendPrice: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="1800000"
                  />
                </div>

                <div>
                  <Label htmlFor="holidayPrice">Giá ngày lễ (VND)</Label>
                  <Input
                    id="holidayPrice"
                    type="number"
                    value={formData.holidayPrice}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, holidayPrice: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="2200000"
                  />
                </div>

                <div>
                  <Label htmlFor="seasonalMultiplier">Hệ số mùa</Label>
                  <Input
                    id="seasonalMultiplier"
                    type="number"
                    step="0.1"
                    value={formData.seasonalMultiplier}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, seasonalMultiplier: Number.parseFloat(e.target.value) || 1 }))
                    }
                    placeholder="1.2"
                  />
                </div>

                <div>
                  <Label>Ngày bắt đầu</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.startDate, "dd/MM/yyyy", { locale: vi })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData((prev) => ({ ...prev, startDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Ngày kết thúc</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.endDate, "dd/MM/yyyy", { locale: vi })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && setFormData((prev) => ({ ...prev, endDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">{editingPricing ? "Cập nhật" : "Tạo mới"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bảng giá</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pricings.length}</div>
            <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trung bình</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(pricings.reduce((sum, p) => sum + p.basePrice, 0) / pricings.length || 0)}
            </div>
            <p className="text-xs text-muted-foreground">+5% từ tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá cao nhất</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(Math.max(...pricings.map((p) => p.holidayPrice)))}</div>
            <p className="text-xs text-muted-foreground">Suite Room - Ngày lễ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pricings.filter((p) => p.isActive).length}</div>
            <p className="text-xs text-muted-foreground">{pricings.filter((p) => !p.isActive).length} tạm dừng</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách bảng giá ({pricings.length})</CardTitle>
          <CardDescription>Quản lý tất cả bảng giá phòng theo thời gian</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách sạn / Phòng</TableHead>
                <TableHead>Giá cơ bản</TableHead>
                <TableHead>Giá cuối tuần</TableHead>
                <TableHead>Giá ngày lễ</TableHead>
                <TableHead>Thời gian áp dụng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricings.map((pricing) => (
                <TableRow key={pricing.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{pricing.hotelName}</div>
                      <div className="text-sm text-muted-foreground">{pricing.roomType}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(pricing.basePrice)}</TableCell>
                  <TableCell>{formatCurrency(pricing.weekendPrice)}</TableCell>
                  <TableCell>{formatCurrency(pricing.holidayPrice)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{format(pricing.startDate, "dd/MM/yyyy", { locale: vi })}</div>
                      <div className="text-muted-foreground">
                        đến {format(pricing.endDate, "dd/MM/yyyy", { locale: vi })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={pricing.isActive} onCheckedChange={() => toggleActive(pricing.id)} />
                      <Badge variant={pricing.isActive ? "default" : "secondary"}>
                        {pricing.isActive ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(pricing)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(pricing.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
