"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative min-h-[112vh] flex items-center justify-center overflow-hidden hero-pattern">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop    
          muted
          playsInline
          className="object-cover w-full h-full opacity-60"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up flex flex-wrap justify-center items-center">
          <span className="text-white mr-4">Timeless</span>
          <span className="text-amber-500 shiny-text">Arabesque</span>
          <span className="text-white ml-4">Artistry</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-up-delay-1">
          Exquisite handcrafted decor inspired by the Fatimid Caliphate era
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
          <Link href="/products">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-6 relative overflow-hidden group">
              <span className="relative z-10">Explore Collection</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-[length:200%_100%] animate-shimmer"></span>
            </Button>
          </Link>
          <Link href="/custom-order">
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10 text-lg px-8 py-6">
              Custom Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
