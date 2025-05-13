"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import "@/components/styles/shiny-button.css"

interface ShinyButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ShinyButton({ children, className = "", onClick }: ShinyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const updateShinePosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <Button
      ref={buttonRef}
      className={`relative overflow-hidden bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={updateShinePosition}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-out bg-[length:200%_100%]"></span>
      {isHovered && (
        <div
          className="shine-effect"
          data-x={position.x}
          data-y={position.y}
        />
      )}
    </Button>
  )
}
