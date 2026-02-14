"use client"

import Link from "next/link"
import { useEffect } from "react"
import { initializeProducts } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/products"
import { useState } from "react"
import { ArrowRight, Zap, Truck, Shield } from "lucide-react"

export default function Home() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    initializeProducts()
    setProducts(getProducts().slice(0, 6))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Welcome to <span className="text-primary">StoreHub</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover premium products at unbeatable prices. Shop electronics, fashion, fitness, and more.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/shop"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Shop Now <ArrowRight size={20} />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="/shopping-hero.jpg" alt="Hero" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Zap className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-semibold text-foreground mb-2">Fast Checkout</h3>
              <p className="text-muted-foreground">Quick and easy checkout process with secure payment options</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-semibold text-foreground mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on orders over Rs. 14,000 to anywhere in Pakistan</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Safe</h3>
              <p className="text-muted-foreground">Your data is protected with the latest security standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
            <Link href="/shop" className="text-primary font-semibold hover:underline flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg opacity-90 mb-8">
            Browse our full collection and find exactly what you're looking for.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Explore Now
          </Link>
        </div>
      </section>
    </div>
  )
}
