"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import UserProfile from "@/components/dashboard/user-profile"
import BottomNav from "@/components/navigation/bottom-nav"
import DesktopSidebar from "@/components/navigation/desktop-sidebar"

export default function OwnerProfilePage() {
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
      <DesktopSidebar activeTab="profile" onTabChange={() => {}} userRole="owner" />

      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen pb-16 lg:pb-0">
          <UserProfile />
        </div>
        <BottomNav activeTab="profile" onTabChange={() => {}} userRole="owner" />
      </div>
    </div>
  )
}
