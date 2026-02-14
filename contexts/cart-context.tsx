"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { CartItem, Product } from "@/lib/types"
import {
  getCart,
  addToCart as addToCartLib,
  removeFromCart as removeFromCartLib,
  updateCartQuantity as updateQuantityLib,
  clearCart as clearCartLib,
  getCartTotal,
} from "@/lib/cart"

interface CartContextType {
  items: CartItem[]
  total: number
  count: number
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    updateCart()
  }, [])

  const updateCart = useCallback(() => {
    const cartItems = getCart()
    setItems(cartItems)
    setTotal(getCartTotal())
  }, [])

  const addToCart = (product: Product, quantity: number) => {
    addToCartLib(product, quantity)
    updateCart()
  }

  const removeFromCart = (productId: string) => {
    removeFromCartLib(productId)
    updateCart()
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantityLib(productId, quantity)
      updateCart()
    }
  }

  const clearCart = () => {
    clearCartLib()
    updateCart()
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, total, count, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
