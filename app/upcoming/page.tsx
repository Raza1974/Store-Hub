"use client"

import { useState, useEffect } from "react"
import { getUpcomingProducts } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Calendar } from "lucide-react"

export default function UpcomingPage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    setProducts(getUpcomingProducts())
  }, [])

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Upcoming Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get excited! These amazing products are coming soon. Stay tuned for their release.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No upcoming products at this time</p>
          </div>
        )}
      </div>
    </div>
  )
}
