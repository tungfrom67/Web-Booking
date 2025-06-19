"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  AlertTriangle,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const transactions = [
  {
    id: "TXN001",
    bookingId: "BK001",
    customerName: "Nguyễn Văn A",
    amount: "4,500,000 ₫",
    method: "VNPay",
    status: "completed",
    date: "2024-01-15",
    time: "14:30",
    fee: "45,000 ₫",
  },
  {
    id: "TXN002",
    bookingId: "BK002",
    customerName: "Trần Thị B",
    amount: "3,200,000 ₫",
    method: "MoMo",
    status: "pending",
    date: "2024-01-15",
    time: "16:45",
    fee: "32,000 ₫",
  },
  {
    id: "TXN003",
    bookingId: "BK003",
    customerName: "Lê Văn C",
    amount: "5,100,000 ₫",
    method: "Thẻ tín dụng",
    status: "failed",
    date: "2024-01-14",
    time: "10:15",
    fee: "51,000 ₫",
  },
  {
    id: "TXN004",
    bookingId: "BK004",
    customerName: "Phạm Thị D",
    amount: "2,800,000 ₫",
    method: "ZaloPay",
    status: "completed",
    date: "2024-01-14",
    time: "09:20",
    fee: "28,000 ₫",
  },
]

const paymentMethods = [
  { name: "VNPay", value: 35, amount: 850000000, color: "#ef4444", transactions: 245 },
  { name: "MoMo", value: 25, amount: 600000000, color: "#8b5cf6", transactions: 189 },
  { name: "ZaloPay", value: 20, amount: 480000000, color: "#3b82f6", transactions: 156 },
  { name: "Thẻ tín dụng", value: 15, amount: 360000000, color: "#10b981", transactions: 123 },
  { name: "Chuyển khoản", value: 5, amount: 120000000, color: "#f59e0b", transactions: 67 },
]

const revenueData = [
  { date: "01/01", revenue: 45000000, transactions: 123 },
  { date: "02/01", revenue: 52000000, transactions: 145 },
  { date: "03/01", revenue: 48000000, transactions: 134 },
  { date: "04/01", revenue: 58000000, transactions: 167 },
  { date: "05/01", revenue: 62000000, transactions: 178 },
  { date: "06/01", revenue: 68000000, transactions: 189 },
  { date: "07/01", revenue: 55000000, transactions: 156 },
]

const statusConfig = {
  completed: { color: "bg-green-500", icon: CheckCircle, label: "Thành công" },
  pending: { color: "bg-yellow-500", icon: Clock, label: "Đang xử lý" },
  failed: { color: "bg-red-500", icon: XCircle, label: "Thất bại" },
  refunded: { color: "bg-blue-500", icon: RefreshCw, label: "Đã hoàn tiền" },
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || txn.status === activeTab
    return matchesSearch && matchesTab
  })

  const stats = {
    totalRevenue: transactions.reduce((sum, txn) => sum + Number.parseInt(txn.amount.replace(/[^\d]/g, "")), 0),
    totalTransactions: transactions.length,
    successRate: (transactions.filter((txn) => txn.status === "completed").length / transactions.length) * 100,
    totalFees: transactions.reduce((sum, txn) => sum + Number.parseInt(txn.fee.replace(/[^\d]/g, "")), 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
        >
          Quản lý thanh toán
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Theo dõi giao dịch và phương thức thanh toán
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Tổng doanh thu",
            value: `${(stats.totalRevenue / 1000000).toFixed(1)}M ₫`,
            icon: DollarSign,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "Giao dịch",
            value: stats.totalTransactions.toString(),
            icon: CreditCard,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Tỷ lệ thành công",
            value: `${stats.successRate.toFixed(1)}%`,
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Phí giao dịch",
            value: `${(stats.totalFees / 1000).toFixed(0)}K ₫`,
            icon: AlertTriangle,
            color: "from-yellow-500 to-orange-500",
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
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Phân bổ theo phương thức và số tiền</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any, props: any) => [
                        `${props.payload.amount.toLocaleString()} ₫`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Trends */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng doanh thu</CardTitle>
              <CardDescription>Doanh thu và số giao dịch theo ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      formatter={(value: any, name: any) => {
                        if (name === "revenue") return [`${value.toLocaleString()} ₫`, "Doanh thu"]
                        return [value, "Giao dịch"]
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Doanh thu" />
                    <Line type="monotone" dataKey="transactions" stroke="#3b82f6" strokeWidth={2} name="Giao dịch" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm giao dịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="completed">Thành công</TabsTrigger>
            <TabsTrigger value="pending">Đang xử lý</TabsTrigger>
            <TabsTrigger value="failed">Thất bại</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Transactions Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Giao dịch gần đây</CardTitle>
            <CardDescription>Danh sách các giao dịch thanh toán</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Giao dịch</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((txn) => {
                  const StatusIcon = statusConfig[txn.status as keyof typeof statusConfig].icon
                  return (
                    <TableRow key={txn.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{txn.id}</div>
                          <div className="text-sm text-gray-500">{txn.bookingId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{txn.customerName}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{txn.amount}</div>
                          <div className="text-sm text-gray-500">Phí: {txn.fee}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{txn.method}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[txn.status as keyof typeof statusConfig].color} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[txn.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{txn.date}</div>
                          <div className="text-sm text-gray-500">{txn.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Tải hóa đơn
                            </DropdownMenuItem>
                            {txn.status === "completed" && (
                              <DropdownMenuItem className="text-red-600">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Hoàn tiền
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
