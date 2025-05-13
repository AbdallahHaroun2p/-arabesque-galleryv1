"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart, PieChart } from "@/app/components/ui/charts"
import { Users, ShoppingBag, DollarSign, Eye } from "lucide-react"

interface AnalyticsData {
  totalVisitors: number
  totalSales: number
  totalRevenue: number
  totalUsers: number
  salesData: { date: string; amount: number }[]
  visitorData: { date: string; count: number }[]
  productPerformance: { name: string; sales: number }[]
}

export function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Visitors</CardTitle>
          <Eye className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{data.totalVisitors.toLocaleString()}</div>
          <p className="text-xs text-gray-400">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{data.totalSales.toLocaleString()}</div>
          <p className="text-xs text-gray-400">+12.5% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">${data.totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-gray-400">+8.2% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{data.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-gray-400">+5.3% from last month</p>
        </CardContent>
      </Card>

      <Card className="col-span-2 bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={data.salesData}
            xField="date"
            yField="amount"
            height={300}
          />
        </CardContent>
      </Card>

      <Card className="col-span-2 bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Visitor Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={data.visitorData}
            xField="date"
            yField="count"
            height={300}
          />
        </CardContent>
      </Card>

      <Card className="col-span-4 bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart
            data={data.productPerformance}
            angleField="sales"
            colorField="name"
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  )
} 