"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Interior Designer",
    company: "Design Studio NYC",
    image: "/testimonials/sarah.jpg",
    content: "The attention to detail in their arabesque patterns is extraordinary. Each piece tells a story of craftsmanship that my clients absolutely love."
  },
  {
    id: 2,
    name: "Ahmed K.",
    role: "Architect",
    company: "Modern Spaces",
    image: "/testimonials/ahmed.jpg",
    content: "I've incorporated their custom panels in several high-end projects. The quality and authenticity of their work is unmatched in the industry."
  },
  {
    id: 3,
    name: "Maria R.",
    role: "Hotel Owner",
    company: "Luxury Stays",
    image: "/testimonials/maria.jpg",
    content: "The custom-made entrance doors transformed our hotel's appearance. The craftsmanship exceeded our expectations."
  },
  {
    id: 4,
    name: "James W.",
    role: "Art Collector",
    company: "Private Collection",
    image: "/testimonials/james.jpg",
    content: "Their ability to blend traditional arabesque patterns with contemporary design elements is remarkable. Each piece is a masterpiece."
  },
  {
    id: 5,
    name: "Leila H.",
    role: "Gallery Curator",
    company: "Contemporary Arts",
    image: "/testimonials/leila.jpg",
    content: "Working with Arabesque Gallery has been a pleasure. Their commitment to preserving authentic craftsmanship while embracing modern aesthetics is inspiring."
  },
  {
    id: 6,
    name: "David C.",
    role: "Restaurant Owner",
    company: "Fine Dining Co.",
    image: "/testimonials/david.jpg",
    content: "The custom screens and wall panels created the perfect ambiance for our restaurant. Our customers are constantly amazed by the intricate details."
  }
]

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    const animationDuration = scrollWidth / 50 // Adjust speed here

    container.style.setProperty('--scroll-width', `${scrollWidth}px`)
    container.style.setProperty('--animation-duration', `${animationDuration}s`)
  }, [])

  return (
    <div className="bg-gray-950 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover why leading designers, architects, and art enthusiasts choose Arabesque Gallery for their projects.
          </p>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={containerRef}
            className="flex gap-6 animate-scroll"
            style={{
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-none w-[350px] bg-gray-900 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-amber-500">{testimonial.company}</p>
                  </div>
                  <Quote className="w-8 h-8 text-amber-500/20 ml-auto" />
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx global>{`
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-width) / 2));
          }
        }
      `}</style>
    </div>
  )
} 