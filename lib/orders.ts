import type { Order, CartItem } from "./types"
import { sendOrderNotificationEmail } from "./email"
import { addOrderNotification } from "./order-notifications"

const ORDERS_KEY = "store_orders"

export const createOrder = (
  userId: string,
  items: CartItem[],
  total: number,
  shippingAddress: string,
  email: string,
  customerName: string,
): Order => {
  const orders = getOrders()
  const newOrder: Order = {
    id: Date.now().toString(),
    userId,
    items,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    shippingAddress,
    email,
  }

  orders.push(newOrder)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))

  const emailData = {
    orderId: newOrder.id,
    customerName: customerName,
    customerEmail: email,
    items: items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
    total: newOrder.total,
    shippingAddress,
    createdAt: newOrder.createdAt,
  }

  sendOrderNotificationEmail(emailData).catch((err) => console.error("[v0] Failed to send order notification:", err))

  addOrderNotification({
    orderId: newOrder.id,
    customerName: customerName,
    customerEmail: email,
    storeEmail: "storehouse@storehubemail.com",
    items: items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
    total: newOrder.total,
    shippingAddress,
    createdAt: newOrder.createdAt,
    sentAt: new Date().toISOString(),
  })

  return newOrder
}

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(ORDERS_KEY)
  return data ? JSON.parse(data) : []
}

export const getUserOrders = (userId: string): Order[] => {
  return getOrders().filter((order) => order.userId === userId)
}

export const getOrderById = (id: string): Order | undefined => {
  return getOrders().find((order) => order.id === id)
}

export const updateOrderStatus = (id: string, status: Order["status"]) => {
  const orders = getOrders()
  const order = orders.find((o) => o.id === id)
  if (order) {
    order.status = status
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }
}
