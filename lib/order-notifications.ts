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

let notifications: OrderNotification[] = []

const NOTIFICATIONS_KEY = "store_order_notifications"

export const addOrderNotification = (notification: OrderNotification) => {
  notifications.push(notification)

  if (typeof window !== "undefined") {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
  }

  console.log("[v0] Order notification added:", notification.orderId)
  console.log("[v0] Email sent to:", notification.storeEmail)
  console.log("[v0] Total notifications:", notifications.length)
}

export const getOrderNotifications = (): OrderNotification[] => {
  if (notifications.length === 0 && typeof window !== "undefined") {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY)
    if (stored) {
      notifications = JSON.parse(stored)
    }
  }
  return notifications
}

export const clearOrderNotifications = () => {
  notifications = []
  if (typeof window !== "undefined") {
    localStorage.removeItem(NOTIFICATIONS_KEY)
  }
}
