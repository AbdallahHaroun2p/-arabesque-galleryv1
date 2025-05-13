"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ShinyButton } from "@/components/shiny-button"
import { ExternalLink, ShoppingBag } from "lucide-react"
import { products as allProducts } from "@/config/products"

// Select featured products - mix of different categories
const products = [
  {
    ...allProducts[2], // Decorative Door
    shopifyUrl: "https://arabesque-gallery.myshopify.com/products/decorative-door",
  },
  {
    ...allProducts[3], // Room Divider
    shopifyUrl: "https://arabesque-gallery.myshopify.com/products/room-divider",
  },
  {
    ...allProducts[0], // Kitchen Cabinet Door with hexagonal pattern
    shopifyUrl: "https://arabesque-gallery.myshopify.com/products/kitchen-cabinet-door-hexagonal",
  },
  {
    ...allProducts[8], // Changed to product 8 (Kitchen door with relief carved design)
    shopifyUrl: "https://arabesque-gallery.myshopify.com/products/kitchen-cabinet-door-relief",
  }
]

export default function FeaturedProducts() {
  const router = useRouter()

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-amber-500">Featured</span> Collection
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our exquisite collection of handcrafted arabesque masterpieces, where traditional craftsmanship meets contemporary design.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 150} direction={index % 2 === 0 ? "up" : "down"}>
              <Card className="bg-gray-900 border-gray-800 overflow-hidden group h-full flex flex-col">
                <a 
                  href={product.shopifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative aspect-[3/4] w-full"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <CardContent className="pt-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <a 
                    href={product.shopifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Shop Now <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-12 flex justify-center">
            <Link href="/products">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-3">
                View Full Collection
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
