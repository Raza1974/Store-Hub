import { type NextRequest, NextResponse } from "next/server"
import { getOrderNotifications } from "@/lib/order-notifications"

// Email templates
const orderNotificationTemplate = (orderData: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0;">🎉 New Order Received!</h1>
      <p style="margin: 10px 0 0 0; font-size: 18px;">Order #${orderData.orderId}</p>
    </div>

    <div style="padding: 30px;">
      <h2 style="color: #333; margin-top: 0;">Order Details</h2>
      
      <p><strong>Customer Email:</strong> ${orderData.customerEmail}</p>
      <p><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleDateString()}</p>
      <p><strong>Shipping Address:</strong> ${orderData.shippingAddress}</p>

      <h3 style="color: #333; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Items</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${orderData.items
          .map(
            (item: any) =>
              `<tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0;">${item.name}</td>
                <td style="padding: 10px 0; text-align: center;">Qty: ${item.quantity}</td>
                <td style="padding: 10px 0; text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
              </tr>`,
          )
          .join("")}
      </table>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #667eea;">
        <p style="font-size: 20px; font-weight: bold; color: #667eea; margin: 0;">
          Total: Rs. ${orderData.total.toLocaleString()}
        </p>
      </div>

      <p style="color: #666; margin-top: 30px; font-size: 12px;">
        Status: <span style="background: #ffc107; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold;">PENDING</span>
      </p>
    </div>

    <div style="background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
      <p style="color: #666; margin: 0; font-size: 12px;">
        This is an automated notification from StoreHub Online Store
      </p>
    </div>
  </div>
`

const statusUpdateTemplate = (data: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0;">📦 Order Status Updated</h1>
    </div>

    <div style="padding: 30px;">
      <p>Hi ${data.customerName},</p>
      <p>Your order <strong>#${data.orderId}</strong> status has been updated.</p>
      
      <div style="background: #f0f0f0; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #667eea;">
          Status: ${data.status.toUpperCase()}
        </p>
      </div>

      <p style="color: #666;">We'll keep you updated on your delivery progress.</p>
    </div>

    <div style="background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
      <p style="color: #666; margin: 0; font-size: 12px;">
        Thank you for shopping with StoreHub!
      </p>
    </div>
  </div>
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, type, orderData, data } = body

    console.log("[v0] Email endpoint called - To:", to, "Subject:", subject)

    const htmlContent =
      type === "order-notification" ? orderNotificationTemplate(orderData) : statusUpdateTemplate(data)

    // Log for debugging
    console.log("[v0] Email details - To:", to, "Type:", type)
    if (type === "order-notification") {
      console.log("[v0] Order ID:", orderData.orderId)
      console.log("[v0] Customer Email:", orderData.customerEmail)
      console.log("[v0] Total Items:", orderData.items.length)
    } else {
      console.log("[v0] Customer Name:", data.customerName)
      console.log("[v0] Order ID:", data.orderId)
      console.log("[v0] Status:", data.status)
    }

    // For development: just log the email
    // In production with Resend integration:
    // const response = await resend.emails.send({
    //   from: "StoreHub <orders@storehubemail.com>",
    //   to: to,
    //   subject: subject,
    //   html: htmlContent,
    // })

    // For now, log that email would be sent
    console.log(`[v0] Email queued for sending to: ${to}`)

    const notifications = getOrderNotifications()

    return NextResponse.json(
      {
        success: true,
        message: `Email notification sent to ${to}`,
        email: {
          to,
          subject,
          type,
          orderId: type === "order-notification" ? orderData.orderId : data.orderId,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Email API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const notifications = getOrderNotifications()

    return NextResponse.json(
      {
        success: true,
        totalOrders: notifications.length,
        notifications: notifications,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error fetching notifications:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notifications",
      },
      { status: 500 },
    )
  }
}
