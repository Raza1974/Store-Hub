export default function Footer() {
  const phoneNumber = "923310384391"
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello%20StoreHub%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.`

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg text-card-foreground mb-4">StoreHub</h3>
            <p className="text-muted-foreground text-sm">Your one-stop shop for quality products at great prices.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/shop" className="text-muted-foreground hover:text-primary transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="/upcoming" className="text-muted-foreground hover:text-primary transition">
                  Upcoming
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-primary transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                <a href="mailto:supperraza@gmail.com" className="hover:text-primary transition">
                  supperraza@gmail.com
                </a>
              </p>
              <p className="text-muted-foreground">
                <a href="tel:+923310384391" className="hover:text-primary transition">
                  +92 331 0384391
                </a>
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 transition font-semibold text-xs"
              >
                <span>💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 StoreHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
