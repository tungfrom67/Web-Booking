import type { Room } from "./room"
import type { Review } from "./review"

export interface Hotel {
  id: string
  name: string
  type: "hotel" | "resort" | "apartment" | "villa"
  address: string
  destination: string
  description: string
  shortDescription: string
  images: string[]
  rating: number
  priceRange: {
    min: number
    max: number
  }
  discount: number
  amenities: string[]
  services: string[]
  roomAmenities: string[]
  highlights: string[]
  rooms: Room[]
  reviews: Review[]
}
