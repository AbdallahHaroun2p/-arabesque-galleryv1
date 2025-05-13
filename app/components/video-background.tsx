"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setError(true)
      setIsLoading(false)
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
    }
  }, [])

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      </div>
    )
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        </div>
      )}
    </>
  )
} 