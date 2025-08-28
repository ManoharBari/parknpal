"use client"

import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

interface DesktopSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: "user" | "owner"
}

export default function DesktopSidebar({ activeTab, onTabChange, userRole }: DesktopSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const userTabs = [
    { id: "home", label: "Find Parking", icon: "home", path: "/dashboard" },
    { id: "bookings", label: "My Bookings", icon: "calendar", path: "/dashboard/bookings" },
    { id: "vehicles", label: "My Vehicles", icon: "car", path: "/dashboard/vehicles" },
    { id: "profile", label: "Profile", icon: "user", path: "/dashboard/profile" },
  ]

  const ownerTabs = [
    { id: "dashboard", label: "Dashboard", icon: "grid", path: "/owner" },
    { id: "spots", label: "My Spots", icon: "map-pin", path: "/owner/spots" },
    { id: "earnings", label: "Earnings", icon: "dollar-sign", path: "/owner/earnings" },
    { id: "profile", label: "Profile", icon: "user", path: "/owner/profile" },
  ]

  const tabs = userRole === "user" ? userTabs : ownerTabs

  const handleTabClick = (tab: any) => {
    router.push(tab.path)
  }

  const getActiveTab = () => {
    const currentTab = tabs.find((tab) => tab.path === pathname)
    return currentTab?.id || tabs[0].id
  }

  const currentActiveTab = getActiveTab()

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  const getIcon = (iconName: string) => {
    const icons = {
      home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      calendar: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      car: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      user: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      grid: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      "map-pin": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      "dollar-sign": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    }
    return icons[iconName as keyof typeof icons] || icons.home
  }

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-card lg:border-r lg:border-border lg:h-screen lg:fixed lg:left-0 lg:top-0">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-black font-montserrat text-primary">ParknPal</h1>
        <p className="text-sm text-muted-foreground font-open-sans capitalize">{userRole} Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={currentActiveTab === tab.id ? "default" : "ghost"}
              onClick={() => handleTabClick(tab)}
              className="w-full justify-start gap-3 h-12 text-left"
            >
              {getIcon(tab.icon)}
              <span className="font-open-sans">{tab.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold">JD</span>
          </div>
          <div>
            <p className="font-semibold font-open-sans text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground font-open-sans">john@example.com</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-xs bg-transparent">
          Logout
        </Button>
      </div>
    </div>
  )
}
