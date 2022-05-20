export interface Influencer {
  instaUserName: string
  instagramName: string
  category1: string
  category2: string
  followers: number
  country: string
  authenticEngagement: number
  engagementAvg: number
}

interface Candidate {
  name: string
  value: number
}

export interface Insight {
  'topInfluencersPerCategoryByFollowers': {[key: string]: Candidate};
  'topInfluencersPerCountryByEngagementAvg': {[key: string]: Candidate};
}
