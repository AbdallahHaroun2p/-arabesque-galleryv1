import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs"

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const orders = await prisma.order.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("[ORDERS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("[ORDERS_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 