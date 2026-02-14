"use client"

import { useEffect, useState } from "react"
import { Mail, Package, Calendar, User } from "lucide-react"
import { formatPrice } from "@/lib/currency"

interface OrderNotification {
  orderId: string
  customerName: string
  customerEmail: string
  storeEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  shippingAddress: string
  createdAt: string
  sentAt: string
}

export default function AdminOrdersPage() {
  const [notifications, setNotifications] = useState<OrderNotification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/send-email")
        const data = await response.json()
        if (data.success) {
          setNotifications(data.notifications)
          console.log("[v0] Loaded order notifications:", data.notifications)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-muted-foreground">Loading order notifications...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Store Order Notifications</h1>
          <p className="text-muted-foreground">Orders sent to storehouse@storehubemail.com</p>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">No order notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.orderId}
                className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Package size={14} /> Order ID
                    </p>
                    <p className="font-bold text-foreground">{notification.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <User size={14} /> Customer
                    </p>
                    <p className="font-semibold text-foreground">{notification.customerName}</p>
                    <p className="text-sm text-muted-foreground">{notification.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Calendar size={14} /> Date
                    </p>
                    <p className="font-semibold text-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total</p>
                    <p className="font-bold text-primary text-lg">{formatPrice(notification.total)}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">ITEMS</p>
                  <div className="space-y-1">
                    {notification.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-foreground">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">SHIPPING ADDRESS</p>
                  <p className="text-sm text-foreground">{notification.shippingAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">📧 Email Integration:</span> Currently, orders are being logged. To send
            real emails to storehouse@storehubemail.com, connect an email service like Resend or SendGrid from the
            Connect section in the sidebar.
          </p>
        </div>
      </div>
    </div>
  )
}
