// lib/currency.ts
export function formatPrice(amount: number) {
  return "$" + amount.toFixed(2)
}
