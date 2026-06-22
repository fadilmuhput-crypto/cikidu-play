export interface Blog {
  slug: string
  title: string
  content: string
  excerpt: string
  category: string
  ageRange: string
  developmentType: string
  image: string
  publishedAt: string
  seo: {
    title: string
    description: string
  }
}

export interface PlayIdea {
  id: string
  title: string
  description: string
  benefits: string[]
  ageRange: string
  developmentGoals: string[]
  activityType: string
  estimatedTime: string
  materials: string[]
  relatedPlaykitSlug?: string
  image: string
}

export interface Playkit {
  slug: string
  name: string
  description: string
  fullDescription: string
  ageSuitability: string
  developmentFocus: string[]
  price: string
  images: string[]
  whatsappMessage: string
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
