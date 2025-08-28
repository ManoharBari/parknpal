"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Transaction {
  id: string
  type: "EARNING" | "PAYOUT" | "FEE"
  amount: number
  description: string
  date: Date
  status: "COMPLETED" | "PENDING" | "PROCESSING"
  spotTitle?: string
  customerName?: string
}

interface EarningsStats {
  totalEarnings: number
  thisMonth: number
  lastMonth: number
  pendingPayouts: number
  availableBalance: number
}

const mockStats: EarningsStats = {
  totalEarnings: 8950,
  thisMonth: 1240,
  lastMonth: 980,
  pendingPayouts: 320,
  availableBalance: 920,
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "EARNING",
    amount: 32,
    description: "Parking booking payment",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "COMPLETED",
    spotTitle: "Downtown Plaza Parking",
    customerName: "John D.",
  },
  {
    id: "TXN002",
    type: "PAYOUT",
    amount: -450,
    description: "Weekly payout to bank account",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "PROCESSING",
  },
  {
    id: "TXN003",
    type: "EARNING",
    amount: 48,
    description: "Parking booking payment",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "COMPLETED",
    spotTitle: "City Center Garage",
    customerName: "Sarah M.",
  },
  {
    id: "TXN004",
    type: "FEE",
    amount: -2.4,
    description: "Platform service fee (5%)",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "COMPLETED",
  },
  {
    id: "TXN005",
    type: "EARNING",
    amount: 24,
    description: "Parking booking payment",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "COMPLETED",
    spotTitle: "Metro Station Lot",
    customerName: "Mike R.",
  },
]

export default function Earnings() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "EARNING":
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )
      case "PAYOUT":
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
        )
      case "FEE":
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500"
      case "PENDING":
        return "bg-yellow-500"
      case "PROCESSING":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const earnings = mockTransactions.filter((t) => t.type === "EARNING")
  const payouts = mockTransactions.filter((t) => t.type === "PAYOUT")

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-black font-montserrat text-foreground">Earnings</h1>
        <p className="text-sm text-muted-foreground font-open-sans">Track your parking income</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black font-montserrat text-primary">${mockStats.availableBalance}</div>
              <div className="text-xs text-muted-foreground font-open-sans">Available Balance</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black font-montserrat text-yellow-600">${mockStats.pendingPayouts}</div>
              <div className="text-xs text-muted-foreground font-open-sans">Pending Payouts</div>
            </CardContent>
          </Card>
        </div>

        {/* Payout Button */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-semibold font-montserrat">Ready to withdraw</h3>
                <p className="text-sm text-muted-foreground font-open-sans">Minimum payout: $50</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-montserrat text-primary">${mockStats.availableBalance}</div>
              </div>
            </div>
            <Button className="w-full font-open-sans" disabled={mockStats.availableBalance < 50}>
              Request Payout
            </Button>
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Earnings Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-open-sans">This Month</span>
              <span className="font-bold font-montserrat text-primary">${mockStats.thisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-open-sans">Last Month</span>
              <span className="font-semibold font-montserrat">${mockStats.lastMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-open-sans">Total Earnings</span>
              <span className="font-bold font-montserrat text-lg">${mockStats.totalEarnings}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-open-sans text-muted-foreground">Growth vs Last Month</span>
              <span className="font-semibold text-green-600">
                +{Math.round(((mockStats.thisMonth - mockStats.lastMonth) / mockStats.lastMonth) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="font-open-sans">
                  All
                </TabsTrigger>
                <TabsTrigger value="earnings" className="font-open-sans">
                  Earnings
                </TabsTrigger>
                <TabsTrigger value="payouts" className="font-open-sans">
                  Payouts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 mt-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    {getTransactionIcon(transaction.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold font-montserrat text-sm">{transaction.description}</span>
                        <Badge className={`${getStatusColor(transaction.status)} text-white font-open-sans text-xs`}>
                          {transaction.status}
                        </Badge>
                      </div>
                      {transaction.spotTitle && (
                        <p className="text-xs text-muted-foreground font-open-sans">
                          {transaction.spotTitle} • {transaction.customerName}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground font-open-sans">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold font-montserrat ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="earnings" className="space-y-3 mt-4">
                {earnings.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    {getTransactionIcon(transaction.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold font-montserrat text-sm">{transaction.description}</span>
                        <Badge className={`${getStatusColor(transaction.status)} text-white font-open-sans text-xs`}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-open-sans">
                        {transaction.spotTitle} • {transaction.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground font-open-sans">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-montserrat text-green-600">+${transaction.amount}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="payouts" className="space-y-3 mt-4">
                {payouts.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    {getTransactionIcon(transaction.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold font-montserrat text-sm">{transaction.description}</span>
                        <Badge className={`${getStatusColor(transaction.status)} text-white font-open-sans text-xs`}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-open-sans">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-montserrat text-blue-600">${Math.abs(transaction.amount)}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
