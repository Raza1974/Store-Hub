"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { getUserOrders } from "@/lib/orders"
import Link from "next/link"
import { Package } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/currency"

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin")
      return
    }

    if (user) {
      const fetchOrders = async () => {
        setLoadingOrders(true)
        try {
          const data = await getUserOrders(user.id) // assuming async
          setOrders(data)
        } catch (err) {
          console.error("Failed to fetch orders:", err)
        } finally {
          setLoadingOrders(false)
        }
      }

      fetchOrders()
    }
  }, [user, loading, router])

  if (loading || loadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-8">
              You haven't placed any orders yet
            </p>
            <Link
              href="/shop"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/order-confirmation/${order.id}`}
                className="block bg-card rounded-lg border border-border p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Order #{order.id}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-foreground">
                      {formatPrice(order.total)}
                    </p>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
