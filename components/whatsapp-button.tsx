"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false)
  const phoneNumber = "923310384391" // Pakistan number format
  const businessName = "StoreHub"

  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello%20${businessName}%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.`

  return (
    <>
      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 duration-300"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={24} />
        </button>

        {/* Popup Menu */}
        {showPopup && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-72 border border-border">
            <h3 className="font-semibold text-foreground mb-3">Contact Us on WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to start a conversation with us. We're here to help!
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle size={20} />
              Start Chat
            </a>
          </div>
        )}
      </div>
    </>
  )
}
