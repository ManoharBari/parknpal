"use client"

import { ParkingCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 300) // Allow fade out animation
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 bg-background flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-primary rounded-2xl flex items-center justify-center">
          <ParkingCircle className="w-12 h-12 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-foreground font-montserrat">ParknPal</h1>
          <p className="text-muted-foreground mt-2 font-open-sans">Smart Parking Made Simple</p>
        </div>
      </div>
    </div>
  )
}
