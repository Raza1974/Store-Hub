// lib/orders.ts
export interface OrderItem {
  productId: string
  quantity: number
  product?: Product
}

export interface Order {
  id: string
  email: string
  createdAt: string
  status: string
  shippingAddress: string
  total: number
  items: OrderItem[]
}

import { Product } from "./products"

const mockOrders: Order[] = [
  {
    id: "1001",
    email: "customer@example.com",
    createdAt: new Date().toISOString(),
    status: "delivered",
    shippingAddress: "123 Street, City, Country",
    total: 120,
    items: [
      { productId: "p1", quantity: 2 },
      { productId: "p2", quantity: 1 },
    ],
  },
  {
    id: "1002",
    email: "john@example.com",
    createdAt: new Date().toISOString(),
    status: "shipped",
    shippingAddress: "456 Avenue, City, Country",
    total: 75,
    items: [
      { productId: "p2", quantity: 3 },
    ],
  },
]

export async function getUserOrders(userId: string): Promise<Order[]> {
  // For mock, return all orders
  return mockOrders
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return mockOrders.find(order => order.id === id)
}
