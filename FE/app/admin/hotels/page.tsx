"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ImageIcon,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Ho Chi Minh City",
    rating: 4.9,
    reviews: 1247,
    rooms: 156,
    occupancy: 87,
    revenue: 284750,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "parking", "restaurant", "gym"],
    description: "Luxury hotel in the heart of the city with world-class amenities.",
    priceRange: "$150-$500",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Da Nang",
    rating: 4.8,
    reviews: 1156,
    rooms: 89,
    occupancy: 92,
    revenue: 267890,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "restaurant", "gym"],
    description: "Beachfront resort with stunning ocean views and premium facilities.",
    priceRange: "$200-$800",
    lastUpdated: "5 hours ago",
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Sapa",
    rating: 4.7,
    reviews: 987,
    rooms: 45,
    occupancy: 76,
    revenue: 198450,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "restaurant"],
    description: "Cozy mountain retreat perfect for nature lovers and adventure seekers.",
    priceRange: "$80-$250",
    lastUpdated: "1 day ago",
  },
  {
    id: 4,
    name: "City Center Inn",
    location: "Hanoi",
    rating: 4.6,
    reviews: 876,
    rooms: 78,
    occupancy: 68,
    revenue: 175200,
    status: "maintenance",
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "parking"],
    description: "Modern business hotel located in the bustling city center.",
    priceRange: "$100-$300",
    lastUpdated: "3 days ago",
  },
]

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  restaurant: Coffee,
  gym: Dumbbell,
}

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || hotel.status === selectedTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
          >
            Hotel Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Manage your hotel properties and monitor their performance.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Hotel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Hotel</DialogTitle>
                <DialogDescription>Create a new hotel property in your management system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Hotel Name</Label>
                    <Input id="name" placeholder="Enter hotel name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Total Rooms</Label>
                    <Input id="rooms" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-min">Min Price</Label>
                    <Input id="price-min" type="number" placeholder="$0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-max">Max Price</Label>
                    <Input id="price-max" type="number" placeholder="$0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter hotel description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Create Hotel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search hotels by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Hotels ({hotels.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({hotels.filter((h) => h.status === "active").length})</TabsTrigger>
            <TabsTrigger value="maintenance">
              Maintenance ({hotels.filter((h) => h.status === "maintenance").length})
            </TabsTrigger>
            <TabsTrigger value="inactive">Inactive (0)</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Hotels Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Hotel Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={hotel.status === "active" ? "default" : "secondary"}
                      className={`${
                        hotel.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      } text-white`}
                    >
                      {hotel.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Hotel
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Manage Photos
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Hotel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Hotel Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center text-slate-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold ml-1">{hotel.rating}</span>
                        <span className="text-slate-500 text-sm ml-1">({hotel.reviews} reviews)</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">{hotel.priceRange}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">{hotel.rooms}</div>
                        <div className="text-xs text-slate-500">Rooms</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Calendar className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">{hotel.occupancy}%</div>
                        <div className="text-xs text-slate-500">Occupancy</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <DollarSign className="w-4 h-4 text-purple-500" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">${hotel.revenue.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">Revenue</div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center space-x-2">
                      {hotel.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                        return (
                          <div key={amenity} className="p-2 bg-slate-100 rounded-lg">
                            <Icon className="w-4 h-4 text-slate-600" />
                          </div>
                        )
                      })}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 line-clamp-2">{hotel.description}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-500">Updated {hotel.lastUpdated}</span>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredHotels.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No hotels found</h3>
          <p className="text-slate-600 mb-4">Try adjusting your search criteria or add a new hotel.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Hotel
          </Button>
        </motion.div>
      )}
    </div>
  )
}
