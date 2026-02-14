"use client"

import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/currency"

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingCart size={64} className="text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
        <Link
          href="/shop"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          <ArrowLeft size={20} /> Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.product.id}
                  className={`p-6 flex gap-4 ${index !== items.length - 1 ? "border-b border-border" : ""}`}
                >
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.product.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 text-foreground hover:bg-muted"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-l border-r border-border">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 text-foreground hover:bg-muted"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping:</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax:</span>
                  <span>{formatPrice(total * 0.1)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-foreground mb-6">
                <span>Total:</span>
                <span>{formatPrice(total * 1.1)}</span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>

              <Link href="/shop" className="block text-center mt-4 text-primary font-semibold hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
