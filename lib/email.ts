const STORE_EMAIL = "storehouse@storehubemail.com"

interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  shippingAddress: string
  createdAt: string
}

export const sendOrderNotificationEmail = async (orderData: OrderEmailData): Promise<boolean> => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: STORE_EMAIL,
        subject: `New Order Received - Order #${orderData.orderId}`,
        type: "order-notification",
        orderData,
      }),
    })

    if (!response.ok) {
      console.error("[v0] Email send failed:", response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return false
  }
}

export const sendOrderStatusUpdateEmail = async (
  customerEmail: string,
  orderId: string,
  status: string,
  customerName: string,
): Promise<boolean> => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: customerEmail,
        subject: `Order #${orderId} Status Updated - ${status.toUpperCase()}`,
        type: "status-update",
        data: {
          orderId,
          status,
          customerName,
        },
      }),
    })

    if (!response.ok) {
      console.error("[v0] Status email send failed:", response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Error sending status email:", error)
    return false
  }
}
