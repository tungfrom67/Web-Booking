import type { Hotel } from "./hotel"

export interface Destination {
  id: string
  name: string
  description: string
  region: string
  image: string
  hotels: Hotel[]
}
