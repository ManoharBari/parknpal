"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface ParkingSpot {
  id: string
  title: string
  address: string
  price: number
  description: string
  features: string[]
  isActive: boolean
  totalBookings: number
  rating: number
  images: string[]
}

const mockSpots: ParkingSpot[] = [
  {
    id: "1",
    title: "Downtown Plaza Parking",
    address: "123 Main St, Downtown",
    price: 8,
    description: "Premium covered parking in the heart of downtown with 24/7 security.",
    features: ["Covered", "Security", "EV Charging"],
    isActive: true,
    totalBookings: 127,
    rating: 4.8,
    images: ["/covered-parking.png"],
  },
  {
    id: "2",
    title: "City Center Garage",
    address: "456 Oak Ave, City Center",
    price: 12,
    description: "Modern parking garage with excellent security features.",
    features: ["24/7 Access", "CCTV", "WiFi"],
    isActive: true,
    totalBookings: 89,
    rating: 4.6,
    images: ["/parking-garage-entrance.png"],
  },
  {
    id: "3",
    title: "Metro Station Lot",
    address: "789 Pine St, Metro Area",
    price: 6,
    description: "Budget-friendly parking option near public transportation.",
    features: ["Near Transit", "Affordable"],
    isActive: false,
    totalBookings: 203,
    rating: 4.3,
    images: ["/security-camera-parking-lot.png"],
  },
]

export default function MySpots() {
  const [spots, setSpots] = useState<ParkingSpot[]>(mockSpots)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSpot, setEditingSpot] = useState<ParkingSpot | null>(null)
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: 0,
    description: "",
    features: [] as string[],
  })

  const availableFeatures = [
    "Covered",
    "Security",
    "EV Charging",
    "24/7 Access",
    "CCTV",
    "WiFi",
    "Near Transit",
    "Affordable",
    "Valet Service",
    "Car Wash",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingSpot) {
      setSpots((prev) => prev.map((s) => (s.id === editingSpot.id ? { ...s, ...formData } : s)))
      setEditingSpot(null)
    } else {
      const newSpot: ParkingSpot = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        totalBookings: 0,
        rating: 0,
        images: ["/covered-parking.png"],
      }
      setSpots((prev) => [...prev, newSpot])
    }

    setShowAddForm(false)
    setFormData({
      title: "",
      address: "",
      price: 0,
      description: "",
      features: [],
    })
  }

  const handleEdit = (spot: ParkingSpot) => {
    setEditingSpot(spot)
    setFormData({
      title: spot.title,
      address: spot.address,
      price: spot.price,
      description: spot.description,
      features: spot.features,
    })
    setShowAddForm(true)
  }

  const toggleSpotStatus = (spotId: string) => {
    setSpots((prev) => prev.map((s) => (s.id === spotId ? { ...s, isActive: !s.isActive } : s)))
  }

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingSpot(null)
    setSelectedSpot(null)
    setFormData({
      title: "",
      address: "",
      price: 0,
      description: "",
      features: [],
    })
  }

  // Spot Detail View
  if (selectedSpot) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setSelectedSpot(null)} className="mr-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold font-montserrat">Spot Details</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="h-48 bg-muted rounded-lg overflow-hidden">
            <img
              src={selectedSpot.images[0] || "/placeholder.svg"}
              alt={selectedSpot.title}
              className="w-full h-full object-cover"
            />
          </div>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-black font-montserrat">{selectedSpot.title}</h2>
                  <p className="text-muted-foreground font-open-sans">{selectedSpot.address}</p>
                </div>
                <Badge variant={selectedSpot.isActive ? "default" : "secondary"} className="font-open-sans">
                  {selectedSpot.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold font-montserrat text-primary">${selectedSpot.price}</div>
                  <div className="text-xs text-muted-foreground font-open-sans">per hour</div>
                </div>
                <div>
                  <div className="text-lg font-bold font-montserrat">{selectedSpot.totalBookings}</div>
                  <div className="text-xs text-muted-foreground font-open-sans">bookings</div>
                </div>
                <div>
                  <div className="text-lg font-bold font-montserrat">{selectedSpot.rating}</div>
                  <div className="text-xs text-muted-foreground font-open-sans">rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={() => handleEdit(selectedSpot)} className="w-full font-open-sans">
              Edit Spot Details
            </Button>
            <Button variant="outline" className="w-full font-open-sans bg-transparent">
              View Booking History
            </Button>
            <Button variant="outline" className="w-full font-open-sans bg-transparent">
              Manage Availability
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Add/Edit Form
  if (showAddForm) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={handleCancel} className="mr-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold font-montserrat">
            {editingSpot ? "Edit Parking Spot" : "Add Parking Spot"}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-open-sans font-medium">
                Spot Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Downtown Plaza Parking"
                required
                className="font-open-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-open-sans font-medium">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="e.g., 123 Main St, Downtown"
                required
                className="font-open-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="font-open-sans font-medium">
                Price per Hour ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="1"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseInt(e.target.value) || 0 }))}
                required
                className="font-open-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-open-sans font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your parking spot..."
                className="font-open-sans"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label className="font-open-sans font-medium">Features</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="rounded"
                    />
                    <Label htmlFor={feature} className="text-sm font-open-sans">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 font-open-sans bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 font-open-sans">
                {editingSpot ? "Update Spot" : "Add Spot"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Main Spots List
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black font-montserrat text-foreground">My Spots</h1>
          <p className="text-sm text-muted-foreground font-open-sans">Manage your parking locations</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} size="sm" className="font-open-sans">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {spots.length > 0 ? (
          spots.map((spot) => (
            <Card
              key={spot.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => setSelectedSpot(spot)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold font-montserrat">{spot.title}</h3>
                      <Badge variant={spot.isActive ? "default" : "secondary"} className="font-open-sans text-xs">
                        {spot.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-open-sans mb-2">{spot.address}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
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
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-open-sans">
                      <span>{spot.totalBookings} bookings</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {spot.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold font-montserrat text-lg">${spot.price}</div>
                    <div className="text-xs text-muted-foreground font-open-sans">per hour</div>
                    <div className="mt-2">
                      <Switch
                        checked={spot.isActive}
                        onCheckedChange={() => toggleSpotStatus(spot.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold font-montserrat mb-2">No parking spots added</h3>
            <p className="text-muted-foreground font-open-sans mb-4">Add your first parking spot to start earning</p>
            <Button onClick={() => setShowAddForm(true)} className="font-open-sans">
              Add Parking Spot
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
