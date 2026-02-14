import type { Product } from "./types"

const PRODUCTS_KEY = "store_products"

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality noise-cancelling headphones with 30-hour battery life",
    fullDescription:
      "Experience premium audio quality with our Premium Wireless Headphones. Featuring advanced noise-cancelling technology, these headphones deliver crystal-clear sound in any environment. With an impressive 30-hour battery life, premium build quality, and intuitive touch controls, they're perfect for music lovers, professionals, and travelers.",
    images: [
      "/wireless-headphones.jpg",
      "/wireless-headphones-side.png",
      "/wireless-headphones-folded.jpg",
      "/wireless-headphones-case.png",
    ],
    specifications: {
      "Noise Cancellation": "Active Noise Cancellation (ANC)",
      "Battery Life": "Up to 30 hours",
      Connectivity: "Bluetooth 5.0 / 3.5mm jack",
      "Driver Size": "40mm custom drivers",
      Impedance: "32 ohm",
      "Frequency Response": "20Hz - 20kHz",
      Weight: "250g",
      Warranty: "2 years",
    },
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Premium build with memory foam cushions",
      "Intuitive touch controls",
      "Built-in microphone for calls",
      "Foldable design for portability",
      "Fast charging - 10 min = 5 hours of play",
    ],
    price: 36394,
    originalPrice: 55998,
    discount: 35,
    image: "/wireless-headphones.jpg",
    category: "Electronics",
    inStock: true,
    rating: 4.5,
    reviews: 328,
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, breathable 100% organic cotton t-shirt",
    fullDescription:
      "Elevate your casual wardrobe with our Organic Cotton T-Shirt. Made from 100% certified organic cotton, this eco-friendly shirt offers supreme comfort and breathability. Perfect for everyday wear, the soft fabric feels gentle on your skin while maintaining its quality through countless washes.",
    images: [
      "/cotton-tshirt.jpg",
      "/organic-cotton-tshirt-front.jpg",
      "/organic-cotton-tshirt-back.jpg",
      "/organic-cotton-tshirt-folded.jpg",
    ],
    specifications: {
      Material: "100% Organic Cotton",
      Weight: "160 gsm",
      Fit: "Regular fit",
      Care: "Machine wash cold",
      "Neck Type": "Crew neck",
      Sleeves: "Short sleeves",
      "Available Sizes": "XS, S, M, L, XL, XXL",
      "Color Options": "White, Black, Navy, Green",
    },
    features: [
      "100% certified organic cotton",
      "Eco-friendly production process",
      "Soft and breathable fabric",
      "Durable and long-lasting",
      "Preshrunk for perfect fit",
      "Reinforced seams",
      "Easy care and maintenance",
    ],
    price: 9797,
    originalPrice: 13997,
    discount: 30,
    image: "/cotton-tshirt.jpg",
    category: "Clothing",
    inStock: true,
    rating: 4.2,
    reviews: 156,
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    description: "Keep drinks hot or cold for 24 hours with double-wall insulation",
    fullDescription:
      "Stay hydrated in style with our premium Stainless Steel Water Bottle. Featuring advanced double-wall vacuum insulation, your beverages stay at the perfect temperature for up to 24 hours. The durable stainless steel construction is built to withstand everyday adventures, making it ideal for gym sessions, outdoor activities, or office work.",
    images: [
      "/clear-water-bottle.png",
      "/stainless-steel-water-bottle-side-view.jpg",
      "/stainless-steel-water-bottle-with-ice.jpg",
      "/water-bottle-collection.jpg",
    ],
    specifications: {
      Capacity: "32 oz (946 ml)",
      Material: "18/8 Stainless Steel",
      Insulation: "Double-wall Vacuum Insulation",
      "Hot Duration": "12 hours",
      "Cold Duration": "24 hours",
      Lid: "Leak-proof screw cap",
      Weight: "380g",
      "BPA Free": "Yes",
    },
    features: [
      "Double-wall vacuum insulation",
      "Keeps cold for 24 hours",
      "Keeps hot for 12 hours",
      "Premium stainless steel construction",
      "Leak-proof lid with easy grip",
      "Fits in standard cup holders",
      "Dishwasher safe",
      "Lifetime warranty",
    ],
    price: 12597,
    originalPrice: null,
    image: "/clear-water-bottle.png",
    category: "Accessories",
    inStock: true,
    rating: 4.7,
    reviews: 412,
  },
  {
    id: "4",
    name: "Yoga Mat Premium",
    description: "Non-slip, eco-friendly yoga mat for all fitness levels",
    fullDescription:
      "Transform your yoga practice with our Premium Yoga Mat. Crafted from eco-friendly materials with superior grip and cushioning, this mat provides the perfect support for your practice. Whether you're a beginner or experienced yogi, the non-slip surface and durability make it an essential addition to your fitness journey.",
    images: [
      "/yoga-mat.jpg",
      "/rolled-yoga-mat.png",
      "/yoga-mat-texture-close-up.jpg",
      "/person-doing-yoga-on-mat.jpg",
    ],
    specifications: {
      Material: "Eco-friendly TPE",
      Thickness: "6mm",
      Length: "68 inches",
      Width: "24 inches",
      "Non-Slip": "Yes - both sides",
      Weight: "1.2 lbs",
      "Environmental Impact": "100% Recyclable",
      Warranty: "1 year",
    },
    features: [
      "Eco-friendly TPE material",
      "6mm thick cushioning",
      "Non-slip surface on both sides",
      "Lightweight and portable",
      "Comes with carrying strap",
      "Moisture and sweat resistant",
      "Easy to clean",
    ],
    price: 16797,
    originalPrice: 22397,
    discount: 25,
    image: "/yoga-mat.jpg",
    category: "Fitness",
    inStock: true,
    rating: 4.6,
    reviews: 287,
  },
  {
    id: "5",
    name: "Smart Watch Ultra",
    description: "Advanced fitness tracking, heart rate monitor, 7-day battery",
    fullDescription:
      "Stay connected and track your fitness with the Smart Watch Ultra. Packed with advanced health monitoring features including heart rate tracking, sleep analysis, and GPS, this smartwatch keeps you informed throughout your day. With a 7-day battery life and sleek design, it's the perfect companion for tech-savvy fitness enthusiasts.",
    images: [
      "/smart-watch.jpg",
      "/smartwatch-on-wrist.png",
      "/smartwatch-display-close-up.jpg",
      "/smartwatch-with-bands.jpg",
    ],
    specifications: {
      Display: "1.4 inch AMOLED touchscreen",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM (50m)",
      Connectivity: "Bluetooth 5.0, WiFi",
      GPS: "Yes",
      "Heart Rate Monitor": "Yes",
      "Sleep Tracking": "Yes",
      OS: "Custom Smart OS",
    },
    features: [
      "Advanced fitness tracking",
      "Heart rate and sleep monitoring",
      "Built-in GPS",
      "7-day battery life",
      "Water resistant up to 50m",
      "Multiple watch faces",
      "Call and message notifications",
      "Stress monitoring",
    ],
    price: 83997,
    originalPrice: 111997,
    discount: 25,
    image: "/smart-watch.jpg",
    category: "Electronics",
    inStock: true,
    rating: 4.4,
    reviews: 534,
  },
  {
    id: "6",
    name: "Leather Messenger Bag",
    description: "Durable leather bag perfect for work and travel",
    fullDescription:
      "Make a statement with our authentic Leather Messenger Bag. Crafted from premium full-grain leather, this timeless bag combines style and functionality. Perfect for professionals and travelers, it features multiple compartments, a padded laptop section, and durable leather handles that improve with age.",
    images: [
      "/leather-bag.jpg",
      "/leather-messenger-bag-front-view.jpg",
      "/leather-messenger-bag-interior.jpg",
      "/leather-messenger-bag-details.jpg",
    ],
    specifications: {
      Material: "Full-grain leather",
      Laptop: "Up to 15 inches",
      "Main Pocket Capacity": "25L",
      "Shoulder Strap": "Adjustable, padded",
      Dimensions: "16 x 10 x 5 inches",
      Weight: "2.5 lbs",
      Warranty: "5 year warranty against defects",
      Color: "Brown",
    },
    features: [
      "Premium full-grain leather",
      "Padded laptop compartment (15 inch)",
      "Multiple interior pockets",
      "Adjustable padded shoulder strap",
      "Quick-access front pocket",
      "Durability increases with use",
      "Professional appearance",
    ],
    price: 55997,
    image: "/leather-bag.jpg",
    category: "Accessories",
    inStock: true,
    rating: 4.8,
    reviews: 221,
  },
  {
    id: "7",
    name: "Running Shoes Pro",
    description: "Lightweight, responsive running shoes for professionals",
    fullDescription:
      "Achieve peak performance with our Running Shoes Pro. Engineered for serious runners, these shoes feature responsive cushioning, a lightweight design, and excellent support. Whether you're training for a marathon or enjoying daily runs, these shoes deliver the comfort and performance you need.",
    images: [
      "/running-shoes.jpg",
      "/running-shoes-side-view.png",
      "/running-shoes-sole-detail.jpg",
      "/running-shoes-on-feet.jpg",
    ],
    specifications: {
      Material: "Mesh and synthetic",
      "Midsole Technology": "Responsive gel cushioning",
      Weight: "220g per shoe",
      Drop: "10mm",
      SizesAvailable: "US 6 - 14",
      ColorOptions: "Black, White, Red",
      Warranty: "1 year",
      RecommendedUse: "Road running",
    },
    features: [
      "Responsive gel cushioning",
      "Lightweight design",
      "Breathable mesh upper",
      "Superior ankle support",
      "Durable rubber outsole",
      "Great for long-distance running",
      "Available in multiple colors",
    ],
    price: 39197,
    originalPrice: 50397,
    discount: 22,
    image: "/running-shoes.jpg",
    category: "Fitness",
    inStock: false,
    rating: 4.5,
    reviews: 445,
  },
  {
    id: "8",
    name: "AI-Powered Smart Speaker",
    description: "Voice-controlled speaker with premium sound quality",
    fullDescription:
      "Experience the future with our AI-Powered Smart Speaker. Featuring advanced voice recognition, premium sound quality, and seamless smart home integration, this speaker transforms your space into an intelligent hub. Control your devices, play music, get information, and enjoy entertainment with simple voice commands.",
    images: [
      "/smart-speaker.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      "Speaker Output": "360W total power",
      Drivers: "Twin 2-inch drivers + subwoofer",
      Connectivity: "WiFi, Bluetooth",
      VoiceAssistant: "AI-powered assistant",
      SmartHome: "Compatible with major brands",
      Microphone: "Far-field microphone array",
      Dimensions: "5 x 5 x 8 inches",
      Warranty: "2 years",
    },
    features: [
      "Advanced AI voice recognition",
      "360W premium sound",
      "Smart home integration",
      "Far-field microphone",
      "Multiple connectivity options",
      "Music streaming support",
      "Weather and news updates",
      "Customizable commands",
    ],
    price: 69997,
    originalPrice: 97997,
    discount: 28,
    image: "/smart-speaker.jpg",
    category: "Electronics",
    inStock: true,
    isUpcoming: true,
    releaseDate: "December 15, 2025",
    rating: 4.3,
    reviews: 189,
  },
]

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return INITIAL_PRODUCTS
  const stored = localStorage.getItem(PRODUCTS_KEY)
  return stored ? JSON.parse(stored) : INITIAL_PRODUCTS
}

export const initializeProducts = () => {
  if (typeof window === "undefined") return
  const existing = localStorage.getItem(PRODUCTS_KEY)
  if (!existing) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS))
  }
}

export const addProduct = (product: Omit<Product, "id">): Product => {
  const products = getProducts()
  const newProduct: Product = { ...product, id: Date.now().toString() }
  products.push(newProduct)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return newProduct
}

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updates }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  }
}

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find((p) => p.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter((p) => p.category === category)
}

export const getUpcomingProducts = (): Product[] => {
  return getProducts().filter((p) => p.isUpcoming)
}
