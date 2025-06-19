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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Wifi, Tv, Coffee, Bath, AirVent, Car, Utensils, Waves } from "lucide-react"

interface RoomAmenity {
  id: string
  name: string
  description: string
  category: string
  icon: string
  isActive: boolean
  createdAt: string
}

export default function RoomAmenitiesPage() {
  const [amenities, setAmenities] = useState<RoomAmenity[]>([
    {
      id: "1",
      name: "WiFi miễn phí",
      description: "Kết nối internet tốc độ cao",
      category: "technology",
      icon: "wifi",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "TV màn hình phẳng",
      description: "TV LED 55 inch với truyền hình cáp",
      category: "entertainment",
      icon: "tv",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Máy pha cà phê",
      description: "Máy pha cà phê Nespresso",
      category: "food-beverage",
      icon: "coffee",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      name: "Bồn tắm",
      description: "Bồn tắm cao cấp với jacuzzi",
      category: "bathroom",
      icon: "bath",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "5",
      name: "Điều hòa không khí",
      description: "Hệ thống điều hòa trung tâm",
      category: "comfort",
      icon: "air-vent",
      isActive: true,
      createdAt: "2024-01-15",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAmenity, setEditingAmenity] = useState<RoomAmenity | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    icon: "",
  })

  const categories = [
    { value: "technology", label: "Công nghệ" },
    { value: "entertainment", label: "Giải trí" },
    { value: "food-beverage", label: "Ăn uống" },
    { value: "bathroom", label: "Phòng tắm" },
    { value: "comfort", label: "Tiện nghi" },
    { value: "safety", label: "An toàn" },
  ]

  const icons = [
    { value: "wifi", label: "WiFi", icon: Wifi },
    { value: "tv", label: "TV", icon: Tv },
    { value: "coffee", label: "Cà phê", icon: Coffee },
    { value: "bath", label: "Bồn tắm", icon: Bath },
    { value: "air-vent", label: "Điều hòa", icon: AirVent },
    { value: "car", label: "Xe hơi", icon: Car },
    { value: "utensils", label: "Đồ ăn", icon: Utensils },
    { value: "waves", label: "Sóng", icon: Waves },
  ]

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      wifi: Wifi,
      tv: Tv,
      coffee: Coffee,
      bath: Bath,
      "air-vent": AirVent,
      car: Car,
      utensils: Utensils,
      waves: Waves,
    }
    const IconComponent = iconMap[iconName] || Wifi
    return <IconComponent className="h-4 w-4" />
  }

  const getCategoryLabel = (category: string) => {
    return categories.find((c) => c.value === category)?.label || category
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAmenity) {
      setAmenities((prev) =>
        prev.map((amenity) => (amenity.id === editingAmenity.id ? { ...amenity, ...formData } : amenity)),
      )
    } else {
      const newAmenity: RoomAmenity = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setAmenities((prev) => [...prev, newAmenity])
    }

    setIsDialogOpen(false)
    setEditingAmenity(null)
    setFormData({ name: "", description: "", category: "", icon: "" })
  }

  const handleEdit = (amenity: RoomAmenity) => {
    setEditingAmenity(amenity)
    setFormData({
      name: amenity.name,
      description: amenity.description,
      category: amenity.category,
      icon: amenity.icon,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setAmenities((prev) => prev.filter((amenity) => amenity.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tiện nghi phòng</h1>
          <p className="text-muted-foreground">Quản lý các tiện nghi có sẵn trong phòng</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingAmenity(null)
                setFormData({ name: "", description: "", category: "", icon: "" })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm tiện nghi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAmenity ? "Chỉnh sửa tiện nghi" : "Thêm tiện nghi mới"}</DialogTitle>
              <DialogDescription>
                {editingAmenity ? "Cập nhật thông tin tiện nghi" : "Tạo tiện nghi mới cho phòng"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên tiện nghi *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="VD: WiFi miễn phí"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chi tiết về tiện nghi..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {icons.map((icon) => {
                        const IconComponent = icon.icon
                        return (
                          <SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              {icon.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">{editingAmenity ? "Cập nhật" : "Tạo mới"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tiện nghi ({amenities.length})</CardTitle>
          <CardDescription>Quản lý tất cả tiện nghi có sẵn trong phòng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiện nghi</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amenities.map((amenity) => (
                <TableRow key={amenity.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getIconComponent(amenity.icon)}
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCategoryLabel(amenity.category)}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{amenity.description}</TableCell>
                  <TableCell>
                    <Badge variant={amenity.isActive ? "default" : "secondary"}>
                      {amenity.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell>{amenity.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(amenity)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(amenity.id)}>
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
