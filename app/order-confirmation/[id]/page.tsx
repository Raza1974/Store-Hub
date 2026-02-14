// app/order-confirmation/[id]/page.tsx
import Link from "next/link"
import { CheckCircle, Package, Mail } from "lucide-react"
import { formatPrice } from "@/lib/currency"
import { getOrderById } from "@/lib/orders"
import { getProductById } from "@/lib/products"

interface OrderConfirmationProps {
  params: { id: string }
}

export default async function OrderConfirmation({ params }: OrderConfirmationProps) {
  const { id } = params

  // Fetch order
  const orderData = await getOrderById(id)

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">Order not found</p>
          <Link
            href="/shop"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // Ensure each item has product details
  const itemsWithProducts = await Promise.all(
    orderData.items.map(async (item: any) => {
      if (!item.product) {
        const product = await getProductById(item.productId)
        return { ...item, product }
      }
      return item
    })
  )

  // Optional: Send confirmation email
  try {
    await fetch(new URL("/api/send-email", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: orderData.email,
        subject: `Order #${orderData.id} - StoreHub`,
        type: "order-notification",
        orderData: {
          orderId: orderData.id,
          customerEmail: orderData.email,
          items: itemsWithProducts.map((item) => ({
            name: item.product?.name || "Unknown Product",
            quantity: item.quantity,
            price: item.product?.price || 0,
          })),
          total: orderData.total,
          shippingAddress: orderData.shippingAddress,
          createdAt: orderData.createdAt,
        },
      }),
    })
  } catch (err) {
    console.error("Failed to send email:", err)
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">Thank you for your purchase</p>
          <p className="text-sm text-green-600 mt-2">
            ✓ Confirmation email sent to {orderData.email}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Order Number</p>
              <p className="text-2xl font-bold text-foreground">{orderData.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Order Date</p>
              <p className="text-lg text-foreground">{new Date(orderData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package size={20} /> Shipping Address
            </h2>
            <p className="text-foreground">{orderData.shippingAddress}</p>
            <p className="text-foreground">{orderData.email}</p>
          </div>

          {/* Order Items */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="font-semibold text-foreground mb-4">Order Items</h2>
            <div className="space-y-4">
              {itemsWithProducts.map((item: any) => (
                <div key={item.product?.id || item.productId} className="flex justify-between text-foreground">
                  <span>{item.product?.name || "Product not found"} x{item.quantity}</span>
                  <span>{formatPrice((item.product?.price || 0) * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between text-xl font-bold text-foreground mb-8">
            <span>Total:</span>
            <span>{formatPrice(orderData.total)}</span>
          </div>

          {/* Status */}
          <div className="bg-primary/10 text-primary p-4 rounded-lg text-center font-semibold mb-6">
            Status: {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
          </div>

          {/* Email Sent Notification */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Mail className="w-5 h-5 text-blue-600 inline-block mr-2" />
            <p className="text-blue-900 font-semibold">
              Order notification sent to {orderData.email}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/orders"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            View All Orders
          </Link>
          <Link
            href="/shop"
            className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
