"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ExternalLink, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { products as configProducts, type Product } from "@/config/products"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

const categories = [
  "All Products",
  "Kitchen Doors",
  "Doors",
  "Room Dividers"
]

export default function ProductsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useCallback(() => {
    return configProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            <span className="text-white">Our </span>
            <span className="text-amber-500">Collection</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay-1">
            Discover our exquisite collection of arabesque designs, each piece carefully crafted to bring timeless elegance to your space.
          </p>
        </div>
      </section>

      <div className="container relative mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-800 text-white w-full"
              />
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      onClick={() => setSelectedCategory(category)}
                      className="w-full justify-start text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts().map((product) => (
                <Card key={product.id} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 overflow-hidden flex flex-col">
                  <CardContent className="p-0 flex-grow">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                      <div className="text-sm text-gray-400">
                        <p>Dimensions: {product.dimensions}</p>
                        <p className="mt-1">Materials: {product.materials?.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <a 
                      href={`https://arabesque-gallery.myshopify.com/products/${product.id.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                        variant="default"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Shop Now
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
