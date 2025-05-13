"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ShoppingBag } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import '@/components/styles/navbar.css'

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/products" },
  { name: "Custom Order", href: "/custom-order" },
  { name: "Contact", href: "/contact" },
] as const

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const activeIndex = pathname ? navLinks.findIndex(link => link.href === pathname) : -1
  const indicatorPosition = typeof hoverIndex === 'number' ? hoverIndex : activeIndex
  const showIndicator = indicatorPosition >= 0

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    router.push(href)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-black/90 backdrop-blur-md" : "py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* Logo - Left */}
          <div className="w-[200px] flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-white font-semibold text-base">ARABESQUE GALLERY</span>
            </Link>
          </div>

          {/* Navigation - Center */}
          <div className="flex-1 flex justify-center">
            <div className="bg-black/90 backdrop-blur-md rounded-full px-1.5 py-1.5 mx-auto">
              <div className="flex relative items-center">
                {showIndicator && (
                  <div 
                    className={cn(
                      "nav-indicator",
                      "nav-indicator-visible",
                      `nav-position-${indicatorPosition}`
                    )}
                  />
                )}
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className={cn(
                      "group relative px-4 py-2 text-[13px] font-medium rounded-full w-[120px] text-center overflow-hidden whitespace-nowrap",
                      pathname === link.href ? "text-white" : "text-gray-400"
                    )}
                  >
                    <span className={`
                      relative z-10 transition-colors duration-300
                      ${hoverIndex === index 
                        ? "text-black" 
                        : "text-white"
                      }
                    `}>
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* View Gallery Button - Right */}
          <div className="w-[200px] flex-shrink-0 flex justify-end">
            <div className="hidden md:block">
              <Button 
                variant="default"
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-black rounded-full"
                onClick={() => router.push('/products')}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Gallery
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-amber-500 hover:bg-gray-800/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href)
                  setIsMobileMenuOpen(false)
                }}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-500",
                  pathname === link.href ? "text-amber-500" : "text-gray-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="default"
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-black rounded-full w-full mt-2"
              onClick={() => {
                router.push('/products')
                setIsMobileMenuOpen(false)
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              View Gallery
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
