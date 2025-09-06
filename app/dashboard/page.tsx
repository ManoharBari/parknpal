"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ParkingMap from "@/components/map/parking-map"
import ParkingSpotDetail from "@/components/booking/parking-spot-detail"
import BookingForm from "@/components/booking/booking-form"
import PaymentForm from "@/components/payment/payment-form"
import BookingConfirmation from "@/components/booking/booking-confirmation"
import BottomNav from "@/components/navigation/bottom-nav"
import DesktopSidebar from "@/components/navigation/desktop-sidebar"
import axios from "axios"

type AppScreen = "map" | "spot-detail" | "booking-form" | "payment-form" | "booking-confirmation"

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
    description: "Premium covered parking in the heart of downtown with 24/7 security and EV charging stations.",
    reviews: 127,
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
    description: "Modern parking garage with excellent security features and complimentary WiFi access.",
    reviews: 89,
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
    description: "Budget-friendly parking option conveniently located near public transportation.",
    reviews: 203,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("map")
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<any>(null)
  const [user, setuser] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const { data } = await axios.get("/api/auth/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setuser(data.data);
        console.log(data.data);

      } catch (error: any) {
        console.log(error.response?.data || error.message);
      }

    };
    fetchUser();
  }, [router])

  const handleSpotSelect = (spotId: string) => {
    setSelectedSpotId(spotId)
    setCurrentScreen("spot-detail")
  }

  const handleBookNow = () => {
    setCurrentScreen("booking-form")
  }

  const handleBookingConfirm = (data: any) => {
    setBookingData(data)
    setCurrentScreen("payment-form")
  }

  const handlePaymentComplete = (paymentData: any) => {
    const confirmationData = {
      ...paymentData,
      id: paymentData.transactionId || "PK" + Math.random().toString(36).substr(2, 8).toUpperCase(),
      status: "CONFIRMED",
    }
    setBookingData(confirmationData)
    setCurrentScreen("booking-confirmation")
  }

  const handleBookingComplete = () => {
    setCurrentScreen("map")
    setSelectedSpotId(null)
    setBookingData(null)
    router.push("/dashboard/bookings")
  }

  const handleBackToMap = () => {
    setCurrentScreen("map")
    setSelectedSpotId(null)
  }

  const handleBackToDetail = () => {
    setCurrentScreen("spot-detail")
  }

  const handleBackToBooking = () => {
    setCurrentScreen("booking-form")
  }

  const selectedSpot = selectedSpotId ? mockParkingSpots.find((spot) => spot.id === selectedSpotId) : null

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} activeTab="home" onTabChange={() => { }} userRole="user" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen pb-16 lg:pb-0">
          {currentScreen === "map" && <ParkingMap onSpotSelect={handleSpotSelect} />}
          {currentScreen === "spot-detail" && selectedSpot && (
            <ParkingSpotDetail spot={selectedSpot} onBookNow={handleBookNow} onBack={handleBackToMap} />
          )}
          {currentScreen === "booking-form" && selectedSpot && (
            <BookingForm spot={selectedSpot} onConfirm={handleBookingConfirm} onBack={handleBackToDetail} />
          )}
          {currentScreen === "payment-form" && bookingData && (
            <PaymentForm
              bookingData={bookingData}
              onPaymentComplete={handlePaymentComplete}
              onBack={handleBackToBooking}
            />
          )}
          {currentScreen === "booking-confirmation" && bookingData && (
            <BookingConfirmation bookingData={bookingData} onDone={handleBookingComplete} />
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav activeTab="home" onTabChange={() => { }} userRole="user" />
      </div>
    </div>
  )
}
