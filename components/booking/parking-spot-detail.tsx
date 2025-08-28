"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ParkingSpot {
  id: string
  title: string
  address: string
  price: number
  distance: number
  rating: number
  features: string[]
  available: boolean
  images?: string[]
  description?: string
  reviews?: number
}

interface ParkingSpotDetailProps {
  spot: ParkingSpot
  onBookNow: () => void
  onBack: () => void
}

export default function ParkingSpotDetail({ spot, onBookNow, onBack }: ParkingSpotDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const mockImages = ["/parking-garage-entrance.png", "/covered-parking.png", "/security-camera-parking-lot.png"]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h1 className="text-lg font-bold font-montserrat">Parking Details</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Image Carousel */}
        <div className="relative h-48 bg-muted">
          <img
            src={mockImages[currentImageIndex] || "/placeholder.svg"}
            alt={`${spot.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {mockImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Title and Rating */}
          <div>
            <h2 className="text-xl font-black font-montserrat text-foreground mb-1">{spot.title}</h2>
            <p className="text-muted-foreground font-open-sans mb-2">{spot.address}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium font-open-sans">{spot.rating}</span>
                <span className="text-muted-foreground font-open-sans">({spot.reviews || 127} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground font-open-sans">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {spot.distance} mi away
              </div>
            </div>
          </div>

          {/* Price */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black font-montserrat text-foreground">${spot.price}</div>
                  <div className="text-sm text-muted-foreground font-open-sans">per hour</div>
                </div>
                <Badge variant={spot.available ? "default" : "secondary"} className="font-open-sans">
                  {spot.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div>
            <h3 className="font-semibold font-montserrat mb-3">Features</h3>
            <div className="flex flex-wrap gap-2">
              {spot.features.map((feature) => (
                <Badge key={feature} variant="outline" className="font-open-sans">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold font-montserrat mb-2">About this spot</h3>
            <p className="text-muted-foreground font-open-sans text-sm leading-relaxed">
              {spot.description ||
                "Convenient parking spot in a prime location. Easy access with good security features. Perfect for short-term and long-term parking needs."}
            </p>
          </div>

          <Separator />

          {/* Reviews Preview */}
          <div>
            <h3 className="font-semibold font-montserrat mb-3">Recent Reviews</h3>
            <div className="space-y-3">
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">JD</span>
                  </div>
                  <div>
                    <div className="font-medium font-open-sans text-sm">John D.</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-open-sans">
                  Great location and very secure. Easy to find and the price is reasonable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="p-4 border-t border-border">
        <Button onClick={onBookNow} className="w-full font-open-sans font-medium" size="lg" disabled={!spot.available}>
          {spot.available ? "Book Now" : "Unavailable"}
        </Button>
      </div>
    </div>
  )
}
