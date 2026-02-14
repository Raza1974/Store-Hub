// Currency conversion utility
// Currency conversion utility

const PKR_CONVERSION_RATE = 280 // 1 USD = ~280 PKR (adjust as needed)

export const formatPrice = (usdPrice: number): string => {
  const pkrPrice = Math.round(usdPrice * PKR_CONVERSION_RATE)
  return `Rs. ${pkrPrice.toLocaleString()}`
}

export const convertToPKR = (usdPrice: number): number => {
  return Math.round(usdPrice * PKR_CONVERSION_RATE)
}

export const FREE_SHIPPING_THRESHOLD = 14000 // ~$50 USD in PKR
export const SHIPPING_FEE = 560 // ~$2 USD in PKR
export const TAX_RATE = 0.17 // 17% tax
