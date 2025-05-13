import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs"

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, description, price, category, stock, image } = body

    if (!name || !price || !category || !stock || !image) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        stock,
        image,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCTS_POST]", error)
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
    const { id, ...data } = body

    if (!id) {
      return new NextResponse("Missing product ID", { status: 400 })
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCTS_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return new NextResponse("Missing product ID", { status: 400 })
    }

    await prisma.product.delete({
      where: {
        id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[PRODUCTS_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 