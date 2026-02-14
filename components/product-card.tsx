"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import { formatPrice } from "@/lib/currency"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative bg-muted overflow-hidden group cursor-pointer aspect-square">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {product.discount && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
              -{product.discount}%
            </div>
          )}
          {product.isUpcoming && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
              Coming Soon
            </div>
          )}
          {!product.inStock && !product.isUpcoming && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-card-foreground hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || product.isUpcoming}
          className={`w-full mt-4 py-2 rounded font-semibold flex items-center justify-center gap-2 transition-colors ${
            !product.inStock || product.isUpcoming
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : added
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          <ShoppingCart size={18} />
          {added ? "Added!" : product.isUpcoming ? "Coming Soon" : product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  )
}
