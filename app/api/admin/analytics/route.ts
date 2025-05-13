import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs"

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get analytics data for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [visitors, sales, revenue, users] = await Promise.all([
      // Total visitors
      prisma.analytics.count({
        where: {
          type: "page_view",
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      // Total sales
      prisma.order.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      // Total revenue
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
        _sum: {
          total: true,
        },
      }),
      // Total users
      prisma.analytics.count({
        where: {
          type: "user_signup",
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
    ])

    // Get sales data for the last 30 days
    const salesData = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _sum: {
        total: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Get visitor data for the last 30 days
    const visitorData = await prisma.analytics.groupBy({
      by: ["createdAt"],
      where: {
        type: "page_view",
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Get product performance data
    const productPerformance = await prisma.product.findMany({
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      take: 5,
    })

    return NextResponse.json({
      totalVisitors: visitors,
      totalSales: sales,
      totalRevenue: revenue._sum.total || 0,
      totalUsers: users,
      salesData: salesData.map((sale) => ({
        date: sale.createdAt.toISOString().split("T")[0],
        amount: Number(sale._sum.total),
      })),
      visitorData: visitorData.map((visitor) => ({
        date: visitor.createdAt.toISOString().split("T")[0],
        count: visitor._count._all,
      })),
      productPerformance: productPerformance.map((product) => ({
        name: product.name,
        sales: product._count.orders,
      })),
    })
  } catch (error) {
    console.error("[ANALYTICS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 