"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  totalSpots: number
  activeBookings: number
  monthlyEarnings: number
  totalEarnings: number
  occupancyRate: number
}

interface RecentBooking {
  id: string
  spotTitle: string
  customerName: string
  startTime: Date
  endTime: Date
  amount: number
  status: "ACTIVE" | "COMPLETED" | "UPCOMING"
}

const mockStats: DashboardStats = {
  totalSpots: 3,
  activeBookings: 2,
  monthlyEarnings: 1240,
  totalEarnings: 8950,
  occupancyRate: 78,
}

const mockRecentBookings: RecentBooking[] = [
  {
    id: "BK001",
    spotTitle: "Downtown Plaza Parking",
    customerName: "John D.",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    amount: 32,
    status: "ACTIVE",
  },
  {
    id: "BK002",
    spotTitle: "City Center Garage",
    customerName: "Sarah M.",
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
    amount: 48,
    status: "UPCOMING",
  },
  {
    id: "BK003",
    spotTitle: "Metro Station Lot",
    customerName: "Mike R.",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 20 * 60 * 60 * 1000),
    amount: 24,
    status: "COMPLETED",
  },
]

export default function OwnerDashboard() {
  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500"
      case "UPCOMING":
        return "bg-blue-500"
      case "COMPLETED":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-black font-montserrat text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground font-open-sans">Overview of your parking business</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black font-montserrat text-primary">{mockStats.totalSpots}</div>
              <div className="text-xs text-muted-foreground font-open-sans">Total Spots</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black font-montserrat text-green-500">{mockStats.activeBookings}</div>
              <div className="text-xs text-muted-foreground font-open-sans">Active Bookings</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black font-montserrat text-primary">${mockStats.monthlyEarnings}</div>
              <div className="text-xs text-muted-foreground font-open-sans">This Month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black font-montserrat text-foreground">{mockStats.occupancyRate}%</div>
              <div className="text-xs text-muted-foreground font-open-sans">Occupancy Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start font-open-sans">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Parking Spot
            </Button>
            <Button variant="outline" className="w-full justify-start font-open-sans bg-transparent">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
              Update Availability
            </Button>
            <Button variant="outline" className="w-full justify-start font-open-sans bg-transparent">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-montserrat text-lg">Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm" className="font-open-sans text-primary">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockRecentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold font-montserrat text-sm">{booking.spotTitle}</h4>
                    <Badge className={`${getStatusColor(booking.status)} text-white font-open-sans text-xs`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-open-sans mb-1">Customer: {booking.customerName}</p>
                  <p className="text-xs text-muted-foreground font-open-sans">
                    {formatDateTime(booking.startTime)} - {formatDateTime(booking.endTime)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold font-montserrat text-primary">${booking.amount}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-lg">This Month's Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-open-sans text-sm">Total Earnings</span>
              <span className="font-bold font-montserrat text-lg text-primary">${mockStats.monthlyEarnings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-open-sans text-sm">Total Bookings</span>
              <span className="font-semibold font-montserrat">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-open-sans text-sm">Average Booking Value</span>
              <span className="font-semibold font-montserrat">${Math.round(mockStats.monthlyEarnings / 24)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-open-sans text-sm">Customer Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold font-montserrat">4.8</span>
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
