"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface Vehicle {
  id: string
  make: string
  model: string
  color: string
  licensePlate: string
}

interface BookingFormProps {
  spot: {
    id: string
    title: string
    address: string
    price: number
  }
  onConfirm: (bookingData: any) => void
  onBack: () => void
}

const mockVehicles: Vehicle[] = [
  { id: "1", make: "Toyota", model: "Camry", color: "Blue", licensePlate: "ABC123" },
  { id: "2", make: "Honda", model: "Civic", color: "White", licensePlate: "XYZ789" },
]

export default function BookingForm({ spot, onConfirm, onBack }: BookingFormProps) {
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [duration, setDuration] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Calculate duration and price when times change
  const calculateBooking = () => {
    if (startDate && startTime && endDate && endTime) {
      const start = new Date(`${startDate}T${startTime}`)
      const end = new Date(`${endDate}T${endTime}`)
      const diffHours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)))
      setDuration(diffHours)
      setTotalPrice(diffHours * spot.price)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVehicle || !startDate || !startTime || !endDate || !endTime) {
      alert("Please fill in all fields")
      return
    }

    const selectedVehicleData = mockVehicles.find((v) => v.id === selectedVehicle)
    const vehicleInfo = selectedVehicleData
      ? `${selectedVehicleData.make} ${selectedVehicleData.model} - ${selectedVehicleData.licensePlate}`
      : "Unknown Vehicle"

    const bookingData = {
      spotId: spot.id,
      spotTitle: spot.title,
      spotAddress: spot.address,
      vehicleId: selectedVehicle,
      vehicleInfo,
      startTime: new Date(`${startDate}T${startTime}`),
      endTime: new Date(`${endDate}T${endTime}`),
      duration,
      totalPrice,
      status: "PENDING",
    }

    onConfirm(bookingData)
  }

  // Set default dates (today and tomorrow)
  const today = new Date().toISOString().split("T")[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h1 className="text-lg font-bold font-montserrat">Book Parking</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Spot Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold font-montserrat mb-1">{spot.title}</h3>
            <p className="text-sm text-muted-foreground font-open-sans mb-2">{spot.address}</p>
            <div className="text-lg font-bold font-montserrat">${spot.price}/hour</div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Selection */}
          <div className="space-y-3">
            <Label className="font-open-sans font-medium">Select Vehicle</Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger className="font-open-sans">
                <SelectValue placeholder="Choose your vehicle" />
              </SelectTrigger>
              <SelectContent>
                {mockVehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id} className="font-open-sans">
                    {vehicle.make} {vehicle.model} - {vehicle.licensePlate}
                  </SelectItem>
                ))}
                <SelectItem value="add-new" className="font-open-sans text-primary">
                  + Add New Vehicle
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Time */}
          <div className="space-y-3">
            <Label className="font-open-sans font-medium">Start Time</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="start-date" className="text-sm font-open-sans">
                  Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value)
                    setTimeout(calculateBooking, 100)
                  }}
                  min={today}
                  className="font-open-sans"
                />
              </div>
              <div>
                <Label htmlFor="start-time" className="text-sm font-open-sans">
                  Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value)
                    setTimeout(calculateBooking, 100)
                  }}
                  className="font-open-sans"
                />
              </div>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-3">
            <Label className="font-open-sans font-medium">End Time</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="end-date" className="text-sm font-open-sans">
                  Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value)
                    setTimeout(calculateBooking, 100)
                  }}
                  min={startDate || today}
                  className="font-open-sans"
                />
              </div>
              <div>
                <Label htmlFor="end-time" className="text-sm font-open-sans">
                  Time
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value)
                    setTimeout(calculateBooking, 100)
                  }}
                  className="font-open-sans"
                />
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {duration > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-montserrat">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between font-open-sans">
                  <span>Duration:</span>
                  <span>
                    {duration} hour{duration !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between font-open-sans">
                  <span>Rate:</span>
                  <span>${spot.price}/hour</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold font-montserrat text-lg">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            className="w-full font-open-sans font-medium"
            size="lg"
            disabled={!selectedVehicle || !startDate || !startTime || !endDate || !endTime}
          >
            Continue to Payment
          </Button>
        </form>
      </div>
    </div>
  )
}
