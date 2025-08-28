"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BookingConfirmationProps {
  bookingData: {
    id?: string
    spotTitle: string
    spotAddress: string
    vehicleInfo: string
    startTime: Date
    endTime: Date
    totalPrice: number
    status: string
  }
  onDone: () => void
}

export default function BookingConfirmation({ bookingData, onDone }: BookingConfirmationProps) {
  const [showQR, setShowQR] = useState(false)

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const bookingId = bookingData.id || "PK" + Math.random().toString(36).substr(2, 8).toUpperCase()

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border text-center">
        <div className="w-16 h-16 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-black font-montserrat text-foreground">Booking Confirmed!</h1>
        <p className="text-muted-foreground font-open-sans mt-1">Your parking spot is reserved</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat flex items-center justify-between">
              Booking Details
              <Badge variant="default" className="font-open-sans">
                {bookingData.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-semibold font-montserrat text-sm">Booking ID</div>
              <div className="font-mono text-primary">{bookingId}</div>
            </div>

            <Separator />

            <div>
              <div className="font-semibold font-montserrat text-sm mb-1">Parking Spot</div>
              <div className="font-open-sans">{bookingData.spotTitle}</div>
              <div className="text-sm text-muted-foreground font-open-sans">{bookingData.spotAddress}</div>
            </div>

            <div>
              <div className="font-semibold font-montserrat text-sm mb-1">Vehicle</div>
              <div className="font-open-sans">{bookingData.vehicleInfo}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold font-montserrat text-sm mb-1">Check-in</div>
                <div className="font-open-sans text-sm">{formatDateTime(bookingData.startTime)}</div>
              </div>
              <div>
                <div className="font-semibold font-montserrat text-sm mb-1">Check-out</div>
                <div className="font-open-sans text-sm">{formatDateTime(bookingData.endTime)}</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-semibold font-montserrat">Total Paid</span>
              <span className="text-xl font-black font-montserrat text-primary">${bookingData.totalPrice}</span>
            </div>
          </CardContent>
        </Card>

        {/* QR Code for Check-in */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-center">Check-in QR Code</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {showQR ? (
              <div className="space-y-3">
                <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg border">
                  <img src="/parking-check-in-qrcode.png" alt="Check-in QR Code" className="w-full h-full" />
                </div>
                <p className="text-sm text-muted-foreground font-open-sans">Scan this code at the parking entrance</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <Button variant="outline" onClick={() => setShowQR(true)} className="font-open-sans">
                  Show QR Code
                </Button>
                <p className="text-sm text-muted-foreground font-open-sans">
                  You'll need this to check in at the parking spot
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold font-montserrat mb-2">Important Notes</h3>
            <ul className="space-y-1 text-sm text-muted-foreground font-open-sans">
              <li>• Arrive within 15 minutes of your start time</li>
              <li>• Use the QR code to check in and out</li>
              <li>• Contact support if you need to extend your booking</li>
              <li>• Late checkout may incur additional charges</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3 border-t border-border">
        <Button variant="outline" className="w-full font-open-sans bg-transparent">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          Share Booking
        </Button>
        <Button onClick={onDone} className="w-full font-open-sans font-medium">
          Done
        </Button>
      </div>
    </div>
  )
}
