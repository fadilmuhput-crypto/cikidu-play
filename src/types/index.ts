export interface Blog {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  category: string | null
  ageRange: string | null
  developmentType: string | null
  image: string | null
  publishedAt: string | null
  seoTitle: string | null
  seoDescription: string | null
}

export interface PlayIdea {
  id: number
  slug: string
  title: string
  description: string | null
  benefits: string[] | null
  ageRange: string | null
  developmentGoals: string[] | null
  activityType: string | null
  estimatedTime: string | null
  materials: string[] | null
  relatedPlaykitSlug: string | null
  image: string | null
}

export interface Playkit {
  id: number
  slug: string
  name: string
  description: string | null
  fullDescription: string | null
  ageSuitability: string | null
  developmentFocus: string[] | null
  price: string | null
  images: string[] | null
  whatsappMessage: string | null
}

export interface Program {
  id: number
  slug: string
  title: string
  type: string
  city: string
  description: string | null
  organizerName: string | null
  organizerContact: string | null
  websiteUrl: string | null
  ageRange: string | null
  startDate: string | null
  endDate: string | null
  image: string | null
  status: string
  submittedAt: string | null
  approvedAt: string | null
}
