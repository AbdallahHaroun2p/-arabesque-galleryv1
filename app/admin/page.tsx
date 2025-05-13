"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnalyticsDashboard } from "@/app/components/admin/analytics-dashboard"
import {
  Package,
  Users,
  ShoppingBag,
  Plus,
  Edit,
  Trash,
  Search,
  ArrowUpDown,
  Check,
  X,
  BarChart2,
  Settings,
  AlertCircle
} from "lucide-react"
import Navbar from "@/components/navbar"

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  image: string
}

interface Order {
  id: string
  date: string
  customer: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

interface User {
  id: string
  name: string
  email: string
  role: string
  joinDate: string
  orders: number
}

export default function AdminPage() {
  const router = useRouter()
  const { userId, isLoaded } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("analytics")
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [analyticsData, setAnalyticsData] = useState({
    totalVisitors: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalUsers: 0,
    salesData: [],
    visitorData: [],
    productPerformance: []
  })

  useEffect(() => {
    setMounted(true)
    // Fetch data from your API
    fetchAnalyticsData()
    fetchProducts()
    fetchOrders()
    fetchUsers()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      const res = await fetch("/api/admin/analytics")
      if (!res.ok) throw new Error("Failed to fetch analytics")
      const data = await res.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error("[FETCH_ANALYTICS]", error)
      // Keep the previous state on error
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products")
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("[FETCH_PRODUCTS]", error)
      // Keep the previous state on error
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders")
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()
      
      // Transform the data to match the Order interface
      const transformedOrders = data.map((order: any) => ({
        id: order.id,
        date: new Date(order.createdAt).toLocaleDateString(),
        customer: order.shippingName || "Anonymous",
        total: Number(order.total),
        status: order.status
      }))
      
      setOrders(transformedOrders)
    } catch (error) {
      console.error("[FETCH_ORDERS]", error)
      // Keep the previous state on error
    }
  }

  const fetchUsers = async () => {
    try {
      // For now, we'll keep mock users since there's no users API yet
      const mockUsers = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          joinDate: "2024-03-01",
          orders: 1
        }
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error("[FETCH_USERS]", error)
      // Keep the previous state on error
    }
  }

  if (!mounted || !isLoaded) return null

  if (!userId) {
    router.push('/auth/sign-in')
    return null
  }

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "text-yellow-500",
      processing: "text-blue-500",
      shipped: "text-purple-500",
      delivered: "text-green-500",
      cancelled: "text-red-500"
    }
    return colors[status]
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        <ScrollReveal>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex gap-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
              <Button variant="outline" className="text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900 border-b border-gray-800 w-full justify-start mb-8">
              <TabsTrigger value="analytics" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <BarChart2 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <Package className="w-4 h-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsDashboard data={analyticsData} />
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <Input
                      placeholder="Search products..."
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {products.map((product: Product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg"
                    >
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span>${product.price.toFixed(2)}</span>
                          <span>•</span>
                          <span>{product.category}</span>
                          <span>•</span>
                          <span className={product.stock < 5 ? "text-yellow-500" : "text-green-500"}>
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-400">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <Input
                      placeholder="Search orders..."
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((order: Order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-white font-medium">Order #{order.id}</h3>
                          <span className={`text-sm ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-400 mt-1">
                          <span>{order.date}</span>
                          <span>•</span>
                          <span>{order.customer}</span>
                          <span>•</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-green-500 hover:text-green-400">
                          <Check className="h-4 w-4 mr-2" />
                          Update Status
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-400">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <Input
                      placeholder="Search users..."
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  {users.map((user: User) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{user.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span>{user.email}</span>
                          <span>•</span>
                          <span className="capitalize">{user.role}</span>
                          <span>•</span>
                          <span>Joined: {user.joinDate}</span>
                          <span>•</span>
                          <span>{user.orders} orders</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-400">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </div>
    </main>
  )
} 