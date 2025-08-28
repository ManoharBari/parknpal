"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Booking {
  id: string
  spotTitle: string
  spotAddress: string
  vehicleInfo: string
  startTime: Date
  endTime: Date
  totalPrice: number
  status: "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  qrCode?: string
}

const mockBookings: Booking[] = [
  {
    id: "PK12345ABC",
    spotTitle: "Downtown Plaza Parking",
    spotAddress: "123 Main St, Downtown",
    vehicleInfo: "Toyota Camry - ABC123",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    totalPrice: 32,
    status: "CONFIRMED",
  },
  {
    id: "PK67890DEF",
    spotTitle: "City Center Garage",
    spotAddress: "456 Oak Ave, City Center",
    vehicleInfo: "Honda Civic - XYZ789",
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    totalPrice: 48,
    status: "ACTIVE",
  },
  {
    id: "PK11111GHI",
    spotTitle: "Metro Station Lot",
    spotAddress: "789 Pine St, Metro Area",
    vehicleInfo: "Toyota Camry - ABC123",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    endTime: new Date(Date.now() - 20 * 60 * 60 * 1000), // Yesterday
    totalPrice: 24,
    status: "COMPLETED",
  },
]

export default function MyBookings() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500"
      case "CONFIRMED":
        return "bg-blue-500"
      case "ACTIVE":
        return "bg-green-500"
      case "COMPLETED":
        return "bg-gray-500"
      case "CANCELLED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const upcomingBookings = mockBookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED")
  const activeBookings = mockBookings.filter((b) => b.status === "ACTIVE")
  const pastBookings = mockBookings.filter((b) => b.status === "COMPLETED" || b.status === "CANCELLED")

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedBooking(booking)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold font-montserrat text-sm">{booking.spotTitle}</h3>
            <p className="text-xs text-muted-foreground font-open-sans">{booking.spotAddress}</p>
          </div>
          <Badge className={`${getStatusColor(booking.status)} text-white font-open-sans text-xs`}>
            {booking.status}
          </Badge>
        </div>

        <div className="space-y-1 text-xs font-open-sans">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vehicle:</span>
            <span>{booking.vehicleInfo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Start:</span>
            <span>{formatDateTime(booking.startTime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">End:</span>
            <span>{formatDateTime(booking.endTime)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${booking.totalPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (selectedBooking) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)} className="mr-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold font-montserrat">Booking Details</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat flex items-center justify-between">
                {selectedBooking.spotTitle}
                <Badge className={`${getStatusColor(selectedBooking.status)} text-white font-open-sans`}>
                  {selectedBooking.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-semibold font-montserrat">Booking ID</div>
                <div className="font-mono text-primary text-sm">{selectedBooking.id}</div>
              </div>

              <div>
                <div className="text-sm font-semibold font-montserrat">Location</div>
                <div className="text-sm font-open-sans">{selectedBooking.spotAddress}</div>
              </div>

              <div>
                <div className="text-sm font-semibold font-montserrat">Vehicle</div>
                <div className="text-sm font-open-sans">{selectedBooking.vehicleInfo}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold font-montserrat">Check-in</div>
                  <div className="text-sm font-open-sans">{formatDateTime(selectedBooking.startTime)}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold font-montserrat">Check-out</div>
                  <div className="text-sm font-open-sans">{formatDateTime(selectedBooking.endTime)}</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold font-montserrat">Total Paid</span>
                <span className="text-lg font-black font-montserrat text-primary">${selectedBooking.totalPrice}</span>
              </div>
            </CardContent>
          </Card>

          {selectedBooking.status === "ACTIVE" && (
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border mb-3">
                  <img src="/parking-check-in-qrcode.png" alt="Check-out QR Code" className="w-full h-full" />
                </div>
                <p className="text-sm text-muted-foreground font-open-sans mb-3">Scan to check out</p>
                <Button className="w-full font-open-sans">Extend Booking</Button>
              </CardContent>
            </Card>
          )}

          {(selectedBooking.status === "CONFIRMED" || selectedBooking.status === "PENDING") && (
            <div className="space-y-2">
              <Button variant="outline" className="w-full font-open-sans bg-transparent">
                Cancel Booking
              </Button>
              <Button variant="outline" className="w-full font-open-sans bg-transparent">
                Modify Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-black font-montserrat text-foreground">My Bookings</h1>
        <p className="text-sm text-muted-foreground font-open-sans">Manage your parking reservations</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="upcoming" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="upcoming" className="font-open-sans">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="active" className="font-open-sans">
              Active
            </TabsTrigger>
            <TabsTrigger value="past" className="font-open-sans">
              Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="flex-1 overflow-y-auto p-4 space-y-3">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground font-open-sans">No upcoming bookings</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeBookings.length > 0 ? (
              activeBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground font-open-sans">No active bookings</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="flex-1 overflow-y-auto p-4 space-y-3">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground font-open-sans">No past bookings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
