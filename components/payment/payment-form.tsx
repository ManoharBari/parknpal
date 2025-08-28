"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple-pay" | "google-pay"
  label: string
  last4?: string
  brand?: string
}

interface PaymentFormProps {
  bookingData: {
    spotTitle: string
    spotAddress: string
    vehicleInfo: string
    startTime: Date
    endTime: Date
    duration: number
    totalPrice: number
  }
  onPaymentComplete: (paymentData: any) => void
  onBack: () => void
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    label: "Visa ending in 4242",
    last4: "4242",
    brand: "visa",
  },
  {
    id: "2",
    type: "card",
    label: "Mastercard ending in 8888",
    last4: "8888",
    brand: "mastercard",
  },
]

export default function PaymentForm({ bookingData, onPaymentComplete, onBack }: PaymentFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [showAddCard, setShowAddCard] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingZip: "",
  })

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardForm((prev) => ({ ...prev, cardNumber: formatted }))
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      setCardForm((prev) => ({ ...prev, expiryDate: formatted }))
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= 4) {
      setCardForm((prev) => ({ ...prev, cvv: value }))
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const paymentData = {
      ...bookingData,
      paymentMethod: selectedPaymentMethod === "new-card" ? "new-card" : selectedPaymentMethod,
      paymentStatus: "COMPLETED",
      transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      paidAt: new Date(),
    }

    onPaymentComplete(paymentData)
    setIsProcessing(false)
  }

  const serviceFee = Math.round(bookingData.totalPrice * 0.05 * 100) / 100
  const totalAmount = bookingData.totalPrice + serviceFee

  const getPaymentMethodIcon = (type: string, brand?: string) => {
    if (type === "card") {
      if (brand === "visa") {
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        )
      } else if (brand === "mastercard") {
        return (
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        )
      }
      return (
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      )
    }
    return null
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h1 className="text-lg font-bold font-montserrat">Payment</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-semibold font-montserrat text-sm">{bookingData.spotTitle}</div>
              <div className="text-sm text-muted-foreground font-open-sans">{bookingData.spotAddress}</div>
            </div>

            <div className="text-sm font-open-sans">
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span>{bookingData.vehicleInfo}</span>
              </div>
              <div className="flex justify-between">
                <span>Start:</span>
                <span>{formatDateTime(bookingData.startTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>End:</span>
                <span>{formatDateTime(bookingData.endTime)}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>
                  {bookingData.duration} hour{bookingData.duration !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              {mockPaymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex items-center gap-3 flex-1">
                    {getPaymentMethodIcon(method.type, method.brand)}
                    <Label htmlFor={method.id} className="font-open-sans flex-1 cursor-pointer">
                      {method.label}
                    </Label>
                  </div>
                </div>
              ))}

              {/* Quick Payment Options */}
              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <RadioGroupItem value="apple-pay" id="apple-pay" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-5 bg-black rounded text-white text-xs flex items-center justify-center font-bold"></div>
                  <Label htmlFor="apple-pay" className="font-open-sans flex-1 cursor-pointer">
                    Apple Pay
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <RadioGroupItem value="google-pay" id="google-pay" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    G
                  </div>
                  <Label htmlFor="google-pay" className="font-open-sans flex-1 cursor-pointer">
                    Google Pay
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <RadioGroupItem value="new-card" id="new-card" />
                <div className="flex items-center gap-3 flex-1">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <Label htmlFor="new-card" className="font-open-sans flex-1 cursor-pointer">
                    Add New Card
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {/* New Card Form */}
            {selectedPaymentMethod === "new-card" && (
              <div className="mt-4 space-y-4 p-4 border border-border rounded-lg bg-muted/20">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="font-open-sans font-medium">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    value={cardForm.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="font-open-sans font-medium">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      value={cardForm.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="font-open-sans font-medium">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      value={cardForm.cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="font-open-sans font-medium">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardholderName"
                    value={cardForm.cardholderName}
                    onChange={(e) => setCardForm((prev) => ({ ...prev, cardholderName: e.target.value }))}
                    placeholder="John Doe"
                    className="font-open-sans"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingZip" className="font-open-sans font-medium">
                    Billing ZIP Code
                  </Label>
                  <Input
                    id="billingZip"
                    value={cardForm.billingZip}
                    onChange={(e) => setCardForm((prev) => ({ ...prev, billingZip: e.target.value }))}
                    placeholder="12345"
                    className="font-open-sans"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-lg">Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between font-open-sans">
              <span>
                Parking ({bookingData.duration} hour{bookingData.duration !== 1 ? "s" : ""})
              </span>
              <span>${bookingData.totalPrice}</span>
            </div>
            <div className="flex justify-between font-open-sans">
              <span>Service Fee</span>
              <span>${serviceFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold font-montserrat text-lg">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <div className="text-sm font-open-sans">
            <div className="font-medium">Secure Payment</div>
            <div className="text-muted-foreground">Your payment information is encrypted and secure</div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handlePayment}
          className="w-full font-open-sans font-medium"
          size="lg"
          disabled={!selectedPaymentMethod || isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </div>
          ) : (
            `Pay $${totalAmount}`
          )}
        </Button>
      </div>
    </div>
  )
}
