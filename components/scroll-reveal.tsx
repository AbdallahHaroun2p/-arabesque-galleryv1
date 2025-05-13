"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  disabled?: boolean
}

export function ScrollReveal({ 
  children, 
  className, 
  threshold = 0.1, 
  delay = 0, 
  direction = "up",
  disabled = false
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Skip animation entirely if disabled
    if (disabled) {
      setIsVisible(true)
      return
    }
    
    // Use a more performant approach with the Intersection Observer API
    const options = {
      threshold,
      rootMargin: "20px",
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Clean up by unobserving once visible
        observer.unobserve(entry.target)
      }
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    
    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, disabled])

  const getDirectionStyles = () => {
    // Less aggressive transforms for better performance
    switch (direction) {
      case "up":
        return "translate-y-10"
      case "down":
        return "translate-y-[-2.5rem]"
      case "left":
        return "translate-x-10"
      case "right":
        return "translate-x-[-2.5rem]"
      default:
        return "translate-y-10"
    }
  }

  // If disabled, just return children without animation wrapper
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isVisible ? "opacity-100 transform-none" : `opacity-0 ${getDirectionStyles()}`,
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
