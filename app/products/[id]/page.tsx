"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ExternalLink } from "lucide-react"
import Navbar from "@/components/navbar"

// Original product data from screenshot
const products = [
  {
    id: "1",
    name: "Arabesque Door Panel",
    description: "Elegant door panel with traditional arabesque patterns",
    price: 1299,
    image: "/images/arabesque-door.png",
    shopifyUrl: "https://your-store.myshopify.com/products/arabesque-door-panel",
    details: [
      "Hand-carved from premium hardwood",
      "Traditional geometric patterns",
      "Custom sizes available",
      "Professional installation service",
      "Protective finish for longevity"
    ]
  },
  {
    id: "2",
    name: "Luxury Wall Panel",
    description: "Contemporary wall panel with geometric designs",
    price: 1499,
    image: "/images/wall-panel.jpeg",
    shopifyUrl: "https://your-store.myshopify.com/products/luxury-wall-panel",
    details: [
      "Modern interpretation of classic patterns",
      "Premium materials",
      "Easy mounting system",
      "Customizable finishes",
      "Ideal for feature walls"
    ]
  },
  // Add similar details for other products...
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = products.find(p => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Button 
            onClick={() => router.push('/products')}
            className="mt-8 bg-amber-500 hover:bg-amber-600 text-black"
          >
            View All Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p className="text-gray-400 text-lg">{product.description}</p>
              <p className="text-3xl font-bold text-amber-500">${product.price}</p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <a href={product.shopifyUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black text-lg py-6">
                    Buy on Our Shop <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
} 