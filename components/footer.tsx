"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, ArrowRight, Mail, Phone, MapPin, Clock, Heart, Send } from "lucide-react"

export default function Footer() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  
  const handleSocialClick = (platform: string) => {
    // Add your social media link handling here
    const urls = {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/"
    }
    window.open(urls[platform as keyof typeof urls], "_blank", "noopener,noreferrer")
  }

  const handleNavClick = (href: string) => {
    router.push(href)
  }
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    
    setIsSubscribing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubscribing(false)
    setSubscribed(true)
    setEmail("")
    
    // Reset subscription message after 5 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 5000)
  }

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-300">
      <div className="mx-auto px-4 py-20">
      
        {/* Newsletter Section - Above content */}
        <div className="max-w-5xl mx-auto mb-16 bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-800 transform hover:border-gray-700 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h3>
              <p className="text-gray-400">Sign up to receive updates on new products, special offers, and arabesque inspiration.</p>
            </div>
            
            <div className="md:flex-1 max-w-md">
              {subscribed ? (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-400 flex items-center gap-2 animate-fade-up">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-700/70 border-gray-700 text-white focus:ring-amber-500 focus:border-amber-500 flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button 
                    type="submit"
                    className="ml-2 bg-amber-500 hover:bg-amber-600 text-black min-w-[120px] group"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Subscribe
                        <Send className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Logo and Info */}
            <div className="md:col-span-4">
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  <h2 className="text-2xl font-bold text-white mb-2 hover:text-amber-500 transition-colors">ARABESQUE GALLERY</h2>
                </Link>
              </div>
              <p className="text-gray-400 mb-6">
                Bringing the timeless beauty of Fatimid-era arabesque art and craftsmanship to contemporary spaces.
              </p>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover:text-amber-500 hover:bg-gray-800 border-gray-700 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('facebook')}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover:text-amber-500 hover:bg-gray-800 border-gray-700 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('instagram')}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover:text-amber-500 hover:bg-gray-800 border-gray-700 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('twitter')}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 md:col-start-6">
              <h3 className="text-lg uppercase tracking-wider mb-6 text-white">NAVIGATION</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Products", href: "/products" },
                  { name: "Custom Order", href: "/custom-order" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-gray-400 hover:text-amber-500 transition-colors duration-300 hover:translate-x-1"
                      onClick={() => handleNavClick(link.href)}
                    >
                      <span className="flex items-center group">
                        <ArrowRight className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                        {link.name}
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div className="md:col-span-5 md:col-start-8">
              <h3 className="text-lg uppercase tracking-wider mb-6 text-white">CONTACT US</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="h-5 w-5 text-amber-500 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400">1234 Pennsylvania Avenue, Washington DC, USA</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400">+1 (202) 555-0123</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400">info@arabesquegallery.com</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Clock className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-gray-400">
                    <p>Monday - Friday: 8:30am - 5:00pm</p>
                    <p>Saturday: 10:00am - 4:00pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} Arabesque Gallery. All rights reserved.</p>
            <div className="flex space-x-6">
              <Button 
                variant="link" 
                className="p-0 h-auto text-gray-500 hover:text-amber-500 transition-colors"
                onClick={() => handleNavClick("/privacy-policy")}
              >
                Privacy Policy
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto text-gray-500 hover:text-amber-500 transition-colors"
                onClick={() => handleNavClick("/terms-of-service")}
              >
                Terms of Service
              </Button>
            </div>
          </div>
          
          {/* Made with love */}
          <div className="text-center mt-8 text-gray-600 text-sm flex items-center justify-center">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 mx-1 text-amber-500 animate-pulse-subtle" />
            <span>by Arabesque Gallery Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
