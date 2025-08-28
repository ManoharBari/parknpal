"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import OwnerDashboard from "@/components/owner/owner-dashboard"
import BottomNav from "@/components/navigation/bottom-nav"
import DesktopSidebar from "@/components/navigation/desktop-sidebar"

export default function OwnerPage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || userRole !== "owner") {
      router.push("/")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background flex">
      <DesktopSidebar activeTab="dashboard" onTabChange={() => {}} userRole="owner" />

      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen pb-16 lg:pb-0">
          <OwnerDashboard />
        </div>
        <BottomNav activeTab="dashboard" onTabChange={() => {}} userRole="owner" />
      </div>
    </div>
  )
}
