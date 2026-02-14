// lib/products.ts
export interface Product {
  id: string
  name: string
  price: number
}

const mockProducts: Product[] = [
  { id: "p1", name: "Product 1", price: 40 },
  { id: "p2", name: "Product 2", price: 40 },
  { id: "p3", name: "Product 3", price: 50 },
]

export async function getProductById(id: string): Promise<Product | undefined> {
  return mockProducts.find(product => product.id === id)
}
