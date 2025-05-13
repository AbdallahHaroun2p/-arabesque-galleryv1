"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from 'next/link'

// Use a simple approach to detect if we're in a mobile context
const isMobileContext = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Determine if animations should be disabled for better performance
  useEffect(() => {
    setIsMobile(isMobileContext());
    
    const handleResize = () => {
      setIsMobile(isMobileContext());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes floatAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-in {
          animation: fadeInUp 0.9s ease forwards;
        }
        
        .animate-in-left {
          animation: fadeInLeft 0.9s ease forwards;
        }
        
        .animate-in-right {
          animation: fadeInRight 0.9s ease forwards;
        }
        
        .animate-scale {
          animation: scaleIn 0.9s ease forwards;
        }
        
        .animate-float {
          animation: floatAnimation 5s ease-in-out infinite;
        }
        
        .process-step {
          transition: all 0.4s ease;
        }
        
        .process-step:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        .process-number {
          transition: all 0.4s ease;
        }
        
        .process-step:hover .process-number {
          background-color: rgba(245, 158, 11, 0.4);
          transform: rotate(10deg) scale(1.1);
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
        }
        
        .image-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transform: skewX(-25deg);
          transition: 0.75s;
        }
        
        .image-container:hover::after {
          left: 125%;
        }
        
        .story-text p {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .story-text p:hover {
          transform: translateX(5px);
        }
        
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
        }
      `}</style>
    
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            <span className="text-white">About </span>
            <span className="text-amber-500 shiny-text">Arabesque Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay-1">
            Preserving the rich heritage of Fatimid-era arabesque art through exquisite craftsmanship
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Section - Street view only */}
            <div className="lg:col-span-7 order-1">
              <ScrollReveal direction="left" disabled={isMobile}>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/images/arabesque-2.jpg" 
                    alt="Fatimid Architecture" 
                    width={800}
                    height={500}
                    className="w-full object-cover h-[400px] md:h-[500px] transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Story Text - Right Side */}
            <div className="lg:col-span-5 order-2">
              <ScrollReveal direction="right" disabled={isMobile}>
                <div className="story-text">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Our <span className="text-amber-500 relative">
                      Story
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-amber-500 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-6 hover:text-white transition-colors duration-300">
                    Founded in 2010, Arabesque Gallery began as a small workshop dedicated to preserving the intricate art
                    of arabesque design. Our founder, inspired by the magnificent architectural elements of the Fatimid
                    Caliphate era, assembled a team of skilled artisans committed to reviving these ancient techniques.
                  </p>
                  <p className="text-gray-300 mb-6 hover:text-white transition-colors duration-300">
                    What started as a passion project has grown into a renowned gallery and workshop, creating bespoke
                    arabesque pieces that adorn homes, hotels, and cultural institutions worldwide. We take pride in our
                    commitment to authenticity, using traditional methods and materials while adapting to contemporary
                    needs.
                  </p>
                  <p className="text-gray-300 mb-6 hover:text-white transition-colors duration-300">
                    Today, Arabesque Gallery stands as a bridge between the rich artistic heritage of the past and the
                    aesthetic sensibilities of the present, ensuring these timeless designs continue to inspire and
                    captivate.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What is Arabesque Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                <span className="text-white">What is </span>
                <span className="text-amber-500">Arabesque?</span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-500/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-amber-500/20 group-hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
                  <div className="absolute top-0 left-0 w-20 h-20 -translate-x-6 -translate-y-6">
                    
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    Arabesque is an art form rooted in Islamic and Middle Eastern design, characterized by intricate geometric patterns, floral motifs, and hand-carved details. Each design is a reflection of balance, beauty, and mathematical precision.
                  </p>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    From ornate furniture to decorative accessories, Arabesque art transforms any space into something truly extraordinary.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/images/pattern1.jpg", alt: "Geometric Pattern", title: "Geometric Precision" },
                  { src: "/images/pattern2.jpg", alt: "Floral Pattern", title: "Floral Elegance" },
                  { src: "/images/pattern3.jpg", alt: "Hand-carved Details", title: "Hand-carved Details" },
                  { src: "/images/pattern4.jpg", alt: "Mathematical Precision", title: "Mathematical Beauty" }
                ].map((pattern, index) => (
                  <div key={pattern.alt} className="group relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={pattern.src}
                      alt={pattern.alt}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm font-medium">{pattern.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Our Products Stand Out Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 relative inline-block">
                <span className="text-white">Why Our Products </span>
                <span className="text-amber-500">Stand Out</span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                Discover the unique qualities that make our arabesque creations truly exceptional
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              {
                icon: "/icons/authenticity.svg",
                title: "Authenticity",
                description: "Sourced directly from Egyptian workshops, ensuring genuine craftsmanship and cultural authenticity.",
                features: ["Traditional Methods", "Original Designs", "Cultural Heritage"]
              },
              {
                icon: "/icons/exclusivity.svg",
                title: "Exclusivity",
                description: "Each piece is handcrafted with meticulous attention to detail, ensuring no two items are identical.",
                features: ["Unique Pieces", "Limited Editions", "Custom Options"]
              },
              {
                icon: "/icons/culture.svg",
                title: "Cultural Connection",
                description: "By choosing our products, you're not only enhancing your space but also supporting artisans and keeping this incredible tradition alive.",
                features: ["Artisan Support", "Heritage Preservation", "Community Impact"]
              }
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 150}>
                <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/10 transform hover:-translate-y-2 transition-all duration-500 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
                  <div className="relative">
                    <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={40}
                        height={40}
                        className="text-amber-500 transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500/5 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-amber-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center text-gray-400 group-hover:text-amber-500/80 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full mr-2 group-hover:bg-amber-500 transition-colors duration-300"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black hero-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <ScrollReveal disabled={isMobile}>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the Beauty of <span className="text-amber-500 relative inline-block">
                Arabesque Art
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500/50 rounded"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Discover our collection of handcrafted arabesque products or commission a custom piece for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/products" 
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-amber-500 px-8 py-4 font-medium text-black transition duration-300 ease-out hover:scale-105"
              >
                <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </Link>
              
              <Link 
                href="/custom-order"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-4 font-medium text-amber-500 transition duration-300 ease-out hover:scale-105"
              >
                <span className="absolute inset-0 h-full w-full border-2 border-amber-500 rounded-lg"></span>
                <span className="absolute inset-0 h-full w-0 bg-amber-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center group-hover:text-black transition-colors duration-300">
                Request Custom Order
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2" />
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
