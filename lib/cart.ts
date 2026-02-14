import type { CartItem, Product } from "./types"

const CART_KEY = "store_cart"

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(CART_KEY)
  return data ? JSON.parse(data) : []
}

export const addToCart = (product: Product, quantity = 1) => {
  const cart = getCart()
  const existingItem = cart.find((item) => item.product.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const removeFromCart = (productId: string) => {
  const cart = getCart()
  const filtered = cart.filter((item) => item.product.id !== productId)
  localStorage.setItem(CART_KEY, JSON.stringify(filtered))
}

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart()
  const item = cart.find((item) => item.product.id === productId)
  if (item) {
    item.quantity = quantity
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
}

export const getCartTotal = (): number => {
  return getCart().reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
}

export const getCartCount = (): number => {
  return getCart().reduce((count, item) => count + item.quantity, 0)
}
