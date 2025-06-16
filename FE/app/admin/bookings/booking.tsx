"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Hotel,
  CreditCard,
  Phone,
  Mail,
  Download,
  MessageSquare,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

const bookings = [
  {
    id: "BK001",
    guestName: "Nguyen Van A",
    guestEmail: "nguyenvana@email.com",
    guestPhone: "+84 901 234 567",
    hotelName: "Grand Palace Hotel",
    roomType: "Deluxe Suite",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    nights: 3,
    guests: 2,
    totalAmount: 450,
    status: "confirmed",
    paymentStatus: "paid",
    bookingDate: "2024-01-10",
    specialRequests: "Late check-in, extra towels",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK002",
    guestName: "Tran Thi B",
    guestEmail: "tranthib@email.com",
    guestPhone: "+84 902 345 678",
    hotelName: "Ocean View Resort",
    roomType: "Ocean View Room",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    nights: 5,
    guests: 4,
    totalAmount: 1200,
    status: "pending",
    paymentStatus: "pending",
    bookingDate: "2024-01-12",
    specialRequests: "Baby crib required",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK003",
    guestName: "Le Van C",
    guestEmail: "levanc@email.com",
    guestPhone: "+84 903 456 789",
    hotelName: "Mountain Lodge",
    roomType: "Standard Room",
    checkIn: "2024-01-12",
    checkOut: "2024-01-14",
    nights: 2,
    guests: 1,
    totalAmount: 160,
    status: "completed",
    paymentStatus: "paid",
    bookingDate: "2024-01-08",
    specialRequests: "Ground floor room",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "BK004",
    guestName: "Pham Thi D",
    guestEmail: "phamthid@email.com",
    guestPhone: "+84 904 567 890",
    hotelName: "City Center Inn",
    roomType: "Business Suite",
    checkIn: "2024-01-25",
    checkOut: "2024-01-27",
    nights: 2,
    guests: 1,
    totalAmount: 300,
    status: "cancelled",
    paymentStatus: "refunded",
    bookingDate: "2024-01-15",
    specialRequests: "Airport shuttle",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const statusConfig = {
  confirmed: { color: "bg-green-500", icon: CheckCircle, label: "Confirmed" },
  pending: { color: "bg-yellow-500", icon: Clock, label: "Pending" },
  completed: { color: "bg-blue-500", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-500", icon: XCircle, label: "Cancelled" },
}

const paymentStatusConfig = {
  paid: { color: "bg-green-500", label: "Paid" },
  pending: { color: "bg-yellow-500", label: "Pending" },
  refunded: { color: "bg-blue-500", label: "Refunded" },
  failed: { color: "bg-red-500", label: "Failed" },
}

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null)

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || booking.status === selectedTab
    return matchesSearch && matchesTab
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    totalRevenue: bookings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.totalAmount, 0),
  }

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
            Booking Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Monitor and manage all hotel bookings in real-time.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-2"
        >
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Bookings", value: stats.total, icon: Calendar, color: "from-blue-500 to-cyan-500" },
          { title: "Confirmed", value: stats.confirmed, icon: CheckCircle, color: "from-green-500 to-emerald-500" },
          { title: "Pending", value: stats.pending, icon: Clock, color: "from-yellow-500 to-orange-500" },
          {
            title: "Total Revenue",
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "from-purple-500 to-pink-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
            placeholder="Search by guest name, hotel, or booking ID..."
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
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({stats.cancelled})</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Bookings Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>A list of all bookings with their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Hotel & Room</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredBookings.map((booking, index) => {
                    const StatusIcon = statusConfig[booking.status as keyof typeof statusConfig].icon
                    return (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-slate-50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={booking.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {booking.guestName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-slate-900">{booking.guestName}</div>
                              <div className="text-sm text-slate-500">{booking.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-900">{booking.hotelName}</div>
                            <div className="text-sm text-slate-500">{booking.roomType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-900">
                              {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-slate-500">
                              {booking.nights} nights • {booking.guests} guests
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-slate-900">${booking.totalAmount}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statusConfig[booking.status as keyof typeof statusConfig].color} text-white`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[booking.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${paymentStatusConfig[booking.paymentStatus as keyof typeof paymentStatusConfig].color} text-white border-0`}
                          >
                            {paymentStatusConfig[booking.paymentStatus as keyof typeof paymentStatusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="w-4 h-4 mr-2" />
                                Contact Guest
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download Invoice
                              </DropdownMenuItem>
                              {booking.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Confirm Booking
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel Booking
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Booking Details - {selectedBooking.id}</span>
                </DialogTitle>
                <DialogDescription>Complete information about this booking</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Guest Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedBooking.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedBooking.guestName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedBooking.guestName}</div>
                        <div className="text-sm text-slate-500">Guest</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                        {selectedBooking.guestEmail}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                        {selectedBooking.guestPhone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Hotel className="w-5 h-5 mr-2" />
                    Booking Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Hotel</Label>
                      <div className="font-medium">{selectedBooking.hotelName}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Room Type</Label>
                      <div className="font-medium">{selectedBooking.roomType}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Check-in</Label>
                      <div className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Check-out</Label>
                      <div className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Duration</Label>
                      <div className="font-medium">{selectedBooking.nights} nights</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Guests</Label>
                      <div className="font-medium">{selectedBooking.guests} guests</div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Total Amount</Label>
                      <div className="text-2xl font-bold text-green-600">${selectedBooking.totalAmount}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Payment Status</Label>
                      <Badge
                        className={`${paymentStatusConfig[selectedBooking.paymentStatus as keyof typeof paymentStatusConfig].color} text-white mt-1`}
                      >
                        {paymentStatusConfig[selectedBooking.paymentStatus as keyof typeof paymentStatusConfig].label}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {selectedBooking.specialRequests && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600">Special Requests</Label>
                    <div className="p-3 bg-slate-50 rounded-lg text-sm">{selectedBooking.specialRequests}</div>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Status</Label>
                      <Badge
                        className={`${statusConfig[selectedBooking.status as keyof typeof statusConfig].color} text-white mt-1`}
                      >
                        {statusConfig[selectedBooking.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Booked on</Label>
                      <div className="text-sm">{new Date(selectedBooking.bookingDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Guest
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings found</h3>
          <p className="text-slate-600 mb-4">Try adjusting your search criteria or check back later.</p>
        </motion.div>
      )}
    </div>
  )
}
