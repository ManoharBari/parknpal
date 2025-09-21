"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 28.6139, // Default latitude
  lng: 77.209,  // Default longitude
};

// Mock parking spot data with realistic coordinates
const mockParkingSpots = [
  {
    id: "1",
    title: "Downtown Plaza Parking",
    address: "123 Main St, Downtown",
    price: 8,
    distance: 0.2,
    rating: 4.8,
    features: ["Covered", "Security", "EV Charging"],
    available: true,
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: "2",
    title: "City Center Garage",
    address: "456 Oak Ave, City Center",
    price: 12,
    distance: 0.4,
    rating: 4.6,
    features: ["24/7 Access", "CCTV", "WiFi"],
    available: true,
    lat: 28.6219,
    lng: 77.2219,
  },
  {
    id: "3",
    title: "Metro Station Lot",
    address: "789 Pine St, Metro Area",
    price: 6,
    distance: 0.8,
    rating: 4.3,
    features: ["Near Transit", "Affordable"],
    available: false,
    lat: 28.6059,
    lng: 77.1959,
  },
  {
    id: "4",
    title: "Business District Parking",
    address: "101 Corporate Blvd",
    price: 15,
    distance: 1.2,
    rating: 4.7,
    features: ["Valet", "Executive", "Indoor"],
    available: true,
    lat: 28.6289,
    lng: 77.2329,
  },
]

interface ParkingMapProps {
  onSpotSelect: (spotId: string) => void
}

export default function ParkingMap({ onSpotSelect }: ParkingMapProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filteredSpots, setFilteredSpots] = useState(mockParkingSpots)
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)

  const filters = [
    { id: "covered", label: "Covered" },
    { id: "ev-charging", label: "EV Charging" },
    { id: "security", label: "Security" },
    { id: "wifi", label: "WiFi" },
    { id: "available", label: "Available Now" },
  ]

  useEffect(() => {
    let filtered = mockParkingSpots

    if (searchQuery) {
      filtered = filtered.filter(
        (spot) =>
          spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedFilters.includes("available")) {
      filtered = filtered.filter((spot) => spot.available)
    }

    if (selectedFilters.includes("covered")) {
      filtered = filtered.filter((spot) => spot.features.includes("Covered"))
    }

    if (selectedFilters.includes("ev-charging")) {
      filtered = filtered.filter((spot) => spot.features.includes("EV Charging"))
    }

    if (selectedFilters.includes("security")) {
      filtered = filtered.filter((spot) => spot.features.includes("Security"))
    }

    if (selectedFilters.includes("wifi")) {
      filtered = filtered.filter((spot) => spot.features.includes("WiFi"))
    }

    setFilteredSpots(filtered)
  }, [searchQuery, selectedFilters])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const handleSpotSelect = (spotId: string) => {
    setSelectedSpot(spotId)
    onSpotSelect(spotId)
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row lg:h-[calc(100vh-4rem)]">
      {/* Mobile/Desktop Search & Filters Header */}
      <div className="lg:w-96 lg:border-r lg:border-border lg:bg-card lg:flex-shrink-0 lg:flex lg:flex-col lg:h-full">
        {/* Search Header - Fixed */}
        <div className="p-4 lg:p-6 space-y-3 bg-card border-b border-border flex-shrink-0">
          <h2 className="hidden lg:block text-xl font-black font-montserrat mb-4">Find Parking</h2>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              placeholder="Where do you want to park?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-open-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="font-open-sans"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              Filters
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            {selectedFilters.length > 0 && (
              <Badge variant="secondary" className="font-open-sans">
                {selectedFilters.length} active
              </Badge>
            )}
          </div>

          {/* Filters - Expandable on both mobile and desktop */}
          {showFilters && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 lg:grid lg:grid-cols-2 lg:gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(filter.id)}
                    className="font-open-sans text-xs lg:justify-start"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Parking Spots List - Scrollable */}
        <div className="hidden lg:flex lg:flex-col lg:flex-1 lg:overflow-hidden">
          <div className="p-6 pb-2 flex-shrink-0">
            <h3 className="font-semibold font-montserrat text-sm">{filteredSpots.length} parking spots found</h3>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-4">
              {filteredSpots.map((spot) => (
                <Card
                  key={spot.id}
                  className={`cursor-pointer transition-all duration-200 ${!spot.available
                    ? "opacity-60"
                    : selectedSpot === spot.id
                      ? "ring-2 ring-primary bg-accent/30"
                      : "hover:bg-accent/50"
                    }`}
                  onClick={() => spot.available && handleSpotSelect(spot.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold font-montserrat text-sm">{spot.title}</h4>
                            {!spot.available && (
                              <Badge variant="secondary" className="text-xs">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-open-sans mb-2">{spot.address}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-montserrat text-lg">${spot.price}</div>
                          <div className="text-xs text-muted-foreground font-open-sans">per hour</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-open-sans">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {spot.distance} mi
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {spot.rating}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {spot.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs font-open-sans">
                            {feature}
                          </Badge>
                        ))}
                        {spot.features.length > 3 && (
                          <Badge variant="outline" className="text-xs font-open-sans">
                            +{spot.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Area - Fixed height on mobile, full screen on desktop */}
      <div className="relative bg-slate-100 h-[300px] m-1 rounded-2xl lg:flex-1 lg:h-full lg:overflow-hidden flex-shrink-0">
        <div className="absolute inset-0">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""}
            loadingElement={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
              </div>
            }
          >
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={center}
              zoom={13}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                disableDefaultUI: false,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ]
              }}
            >
              {/* Render markers for each parking spot */}
              {filteredSpots.map((spot) => (
                <Marker
                  key={spot.id}
                  position={{ lat: spot.lat, lng: spot.lng }}
                  onClick={() => handleSpotSelect(spot.id)}
                  icon={{
                    url: `data:image/svg+xml,${encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" fill="${spot.available ? '#3b82f6' : '#6b7280'}" stroke="white" stroke-width="2"/>
                      <text x="20" y="25" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">$${spot.price}</text>
                    </svg>
                  `)}`,
                    scaledSize: { width: 40, height: 40 } as google.maps.Size,
                    anchor: { x: 20, y: 20 } as google.maps.Point,
                  }}
                  title={`${spot.title} - $${spot.price}/hr`}
                />
              ))}
            </GoogleMap>
          </LoadScript>

          {/* Map Loading Fallback */}
          {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="text-center space-y-4 p-8">
                <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 lg:w-12 lg:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Map View</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Google Maps API key not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your environment variables.
                  </p>
                </div>

                {/* Demo pins for visual reference */}
                <div className="relative w-full max-w-md h-48 bg-slate-200 rounded-lg mx-auto overflow-hidden">
                  {filteredSpots.slice(0, 4).map((spot, index) => (
                    <div
                      key={spot.id}
                      className="absolute"
                      style={{
                        left: `${20 + (index * 20)}%`,
                        top: `${30 + (index * 10)}%`,
                      }}
                    >
                      <Button
                        size="sm"
                        variant={spot.available ? "default" : "secondary"}
                        className="rounded-full w-8 h-8 p-0 shadow-lg hover:scale-110 transition-transform"
                        onClick={() => handleSpotSelect(spot.id)}
                      >
                        <span className="text-xs font-bold">${spot.price}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Parking Spots List - Hidden on desktop */}
        <div className="overflow-y-auto mt-[300px] bg-background border-t border-border lg:hidden">
          <div className="p-4">
            <h3 className="font-semibold font-montserrat mb-3">{filteredSpots.length} parking spots found</h3>
            <div className="space-y-3 pb-16">
              {filteredSpots.map((spot) => (
                <Card
                  key={spot.id}
                  className={`cursor-pointer transition-colors ${!spot.available ? "opacity-60" : "hover:bg-accent/50"
                    }`}
                  onClick={() => spot.available && handleSpotSelect(spot.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold font-montserrat text-sm">{spot.title}</h4>
                          {!spot.available && (
                            <Badge variant="secondary" className="text-xs">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-open-sans mb-2">{spot.address}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-open-sans">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {spot.distance} mi
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {spot.rating}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {spot.features.slice(0, 2).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs font-open-sans">
                              {feature}
                            </Badge>
                          ))}
                          {spot.features.length > 2 && (
                            <Badge variant="outline" className="text-xs font-open-sans">
                              +{spot.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-montserrat text-lg">${spot.price}</div>
                        <div className="text-xs text-muted-foreground font-open-sans">per hour</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}