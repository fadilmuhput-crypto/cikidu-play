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
