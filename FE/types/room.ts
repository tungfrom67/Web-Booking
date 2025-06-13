export interface Room {
  id: string
  name: string
  description: string
  images: string[]
  price: number
  discount: number
  maxOccupancy: number
  size?: number
  bedType: string
  features: string[]
  amenities: string[]
  policies: {
    text: string
    allowed: boolean
  }[]
}
