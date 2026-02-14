export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  fullDescription?: string
  images?: string[]
  specifications?: Record<string, string>
  features?: string[]
  price: number
  originalPrice?: number | null
  discount?: number
  image: string
  category: string
  inStock: boolean
  rating?: number
  reviews?: number
  isUpcoming?: boolean
  releaseDate?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  shippingAddress: string
  email: string
}
