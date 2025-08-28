"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
  isDefault: boolean
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    color: "Blue",
    licensePlate: "ABC123",
    isDefault: true,
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2021,
    color: "White",
    licensePlate: "XYZ789",
    isDefault: false,
  },
]

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    licensePlate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingVehicle) {
      // Update existing vehicle
      setVehicles((prev) => prev.map((v) => (v.id === editingVehicle.id ? { ...v, ...formData } : v)))
      setEditingVehicle(null)
    } else {
      // Add new vehicle
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        ...formData,
        isDefault: vehicles.length === 0,
      }
      setVehicles((prev) => [...prev, newVehicle])
      setShowAddForm(false)
    }

    setFormData({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      licensePlate: "",
    })
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
    })
    setShowAddForm(true)
  }

  const handleDelete = (vehicleId: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId))
  }

  const handleSetDefault = (vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        isDefault: v.id === vehicleId,
      })),
    )
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingVehicle(null)
    setFormData({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      licensePlate: "",
    })
  }

  if (showAddForm) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={handleCancel} className="mr-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold font-montserrat">{editingVehicle ? "Edit Vehicle" : "Add Vehicle"}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="make" className="font-open-sans font-medium">
                Make
              </Label>
              <Input
                id="make"
                value={formData.make}
                onChange={(e) => setFormData((prev) => ({ ...prev, make: e.target.value }))}
                placeholder="e.g., Toyota"
                required
                className="font-open-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="font-open-sans font-medium">
                Model
              </Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
                placeholder="e.g., Camry"
                required
                className="font-open-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="font-open-sans font-medium">
                Year
              </Label>
              <Select
                value={formData.year.toString()}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, year: Number.parseInt(value) }))}
              >
                <SelectTrigger className="font-open-sans">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()} className="font-open-sans">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color" className="font-open-sans font-medium">
                Color
              </Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                placeholder="e.g., Blue"
                required
                className="font-open-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlate" className="font-open-sans font-medium">
                License Plate
              </Label>
              <Input
                id="licensePlate"
                value={formData.licensePlate}
                onChange={(e) => setFormData((prev) => ({ ...prev, licensePlate: e.target.value.toUpperCase() }))}
                placeholder="e.g., ABC123"
                required
                className="font-open-sans font-mono"
              />
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
                {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black font-montserrat text-foreground">My Vehicles</h1>
          <p className="text-sm text-muted-foreground font-open-sans">Manage your registered vehicles</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} size="sm" className="font-open-sans">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="relative">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold font-montserrat">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.isDefault && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded font-open-sans">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-open-sans mb-2">
                      {vehicle.color} • {vehicle.licensePlate}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(vehicle)}
                        className="font-open-sans text-xs"
                      >
                        Edit
                      </Button>
                      {!vehicle.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(vehicle.id)}
                          className="font-open-sans text-xs"
                        >
                          Set Default
                        </Button>
                      )}
                      {vehicles.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(vehicle.id)}
                          className="font-open-sans text-xs text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="font-semibold font-montserrat mb-2">No vehicles added</h3>
            <p className="text-muted-foreground font-open-sans mb-4">Add your first vehicle to start booking parking</p>
            <Button onClick={() => setShowAddForm(true)} className="font-open-sans">
              Add Vehicle
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
