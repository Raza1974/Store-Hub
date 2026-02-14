"use client"

import { Users, Award, Zap, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">About StoreHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are committed to bringing you quality products and exceptional customer service.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2024, StoreHub began with a simple mission: to provide customers with access to high-quality
              products at competitive prices, all from the comfort of their homes.
            </p>
            <p className="text-muted-foreground mb-4">
              We've grown from a small startup to a trusted online retailer, serving thousands of customers worldwide.
              Our commitment to excellence has never wavered.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to innovate and improve our platform to give you the best shopping experience possible.
            </p>
          </div>
          <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
            <img src="/about-us.jpg" alt="About Us" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Customer First</h3>
              <p className="text-muted-foreground text-sm">Your satisfaction is our top priority</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Quality</h3>
              <p className="text-muted-foreground text-sm">We only offer premium products</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm">Constantly improving your experience</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Community</h3>
              <p className="text-muted-foreground text-sm">Building relationships that last</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card rounded-lg border border-border p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50K+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">1000+</p>
              <p className="text-muted-foreground">Quality Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">98%</p>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
