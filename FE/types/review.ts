export interface Review {
  id: string
  userName: string
  userAvatar?: string
  date: string
  rating: number
  comment: string
  category?: string
  helpfulCount?: number
  response?: string
}
