"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface UserProfile {
  name: string
  email: string
  phone: string
  notifications: {
    bookingReminders: boolean
    promotions: boolean
    updates: boolean
  }
}

const mockProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  notifications: {
    bookingReminders: true,
    promotions: false,
    updates: true,
  },
}

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(mockProfile)

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  const handleNotificationChange = (key: keyof UserProfile["notifications"], value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black font-montserrat text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground font-open-sans">Manage your account settings</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="font-open-sans">
            Edit
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-primary-foreground font-montserrat">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <Button variant="outline" size="sm" className="font-open-sans bg-transparent">
            Change Photo
          </Button>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-open-sans font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="font-open-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-open-sans font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="font-open-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-open-sans font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="font-open-sans"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={handleCancel} variant="outline" className="flex-1 font-open-sans bg-transparent">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="flex-1 font-open-sans">
                    Save Changes
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold font-montserrat">Name</div>
                  <div className="font-open-sans">{profile.name}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold font-montserrat">Email</div>
                  <div className="font-open-sans">{profile.email}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold font-montserrat">Phone</div>
                  <div className="font-open-sans">{profile.phone}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium font-open-sans">Booking Reminders</div>
                <div className="text-sm text-muted-foreground font-open-sans">Get notified about upcoming bookings</div>
              </div>
              <Switch
                checked={profile.notifications.bookingReminders}
                onCheckedChange={(checked) => handleNotificationChange("bookingReminders", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium font-open-sans">Promotions</div>
                <div className="text-sm text-muted-foreground font-open-sans">Receive offers and discounts</div>
              </div>
              <Switch
                checked={profile.notifications.promotions}
                onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium font-open-sans">App Updates</div>
                <div className="text-sm text-muted-foreground font-open-sans">News about new features</div>
              </div>
              <Switch
                checked={profile.notifications.updates}
                onCheckedChange={(checked) => handleNotificationChange("updates", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start font-open-sans bg-transparent">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start font-open-sans bg-transparent">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start font-open-sans bg-transparent">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Terms & Privacy
            </Button>
            <Separator />
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 font-open-sans bg-transparent"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
