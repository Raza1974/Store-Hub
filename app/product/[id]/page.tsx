"use client"

import { useState, useEffect } from "react"
import { getProductById } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { Star, Truck, Shield, RotateCcw, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/currency"

export default function ProductPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const resolvedParams = params instanceof Promise ? await params : params
        const prod = getProductById(resolvedParams.id)
        setProduct(prod)
      } catch (error) {
        console.error("[v0] Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">Product not found</p>
          <Link href="/shop" className="text-primary hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const currentImage = productImages[selectedImageIndex]

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-square mb-4">
              <img src={currentImage || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-bold text-lg">
                  -{product.discount}%
                </div>
              )}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">{product.fullDescription || product.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.isUpcoming ? (
                <div className="text-primary font-semibold">Coming Soon: {product.releaseDate}</div>
              ) : (
                <div className={product.inStock ? "text-green-500 font-semibold" : "text-destructive font-semibold"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {!product.isUpcoming && product.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground hover:bg-muted"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
                    added ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  <ShoppingCart size={20} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            )}

            {/* Features */}
            <div className="border-t border-border pt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold text-foreground">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">On orders over Rs. 14,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold text-foreground">Secure Purchase</h4>
                  <p className="text-sm text-muted-foreground">100% protected transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold text-foreground">Easy Returns</h4>
                  <p className="text-sm text-muted-foreground">30-day return guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
              <div className="space-y-4 border border-border rounded-lg divide-y divide-border">
                {Object.entries(product.specifications).map(([key, value]: [string, any], idx: number) => (
                  <div key={idx} className="flex justify-between items-start py-3 px-4">
                    <span className="font-semibold text-foreground">{key}</span>
                    <span className="text-muted-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
