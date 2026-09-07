export type Stage = 
  | 'PRE_SEED' 
  | 'SEED' 
  | 'SERIES_A' 
  | 'SERIES_B' 
  | 'SERIES_C_PLUS'

export type InvestorType = 
  | 'VC' 
  | 'ANGEL' 
  | 'FAMILY_OFFICE' 
  | 'PE' 
  | 'CORPORATE'

export type Action = 
  | 'PASS' 
  | 'INTEREST' 
  | 'SUPER_INTEREST' 
  | 'SAVE' 
  | 'VIEW'

export interface FounderProfile {
  id: string
  userId: string
  companyName: string
  description: string
  industry: string
  subIndustry?: string
  stage: Stage
  geography: string[]
  targetMarkets: string[]
  revenueArr?: number
  growthRateYoY?: number
  netRetention?: number
  fundingHistory?: {
    round: string
    amount: number
    investors: string[]
  }[]
  raiseAmount?: number
  valuation?: number
  businessModel: string
  customerType?: 'ENTERPRISE' | 'SMB' | 'CONSUMER' | 'GOV'
  investorPreferences: string[]
  competitors?: string[]
  embedding?: number[]
  profileCompleteness: number
}

export interface InvestorProfile {
  id: string
  userId: string
  name: string
  logoUrl?: string
  investorType: InvestorType
  verified: boolean
  thesis: string
  locations: string[]
  industries: string[]
  excludedIndustries: string[]
  subIndustries?: string[]
  stages: Stage[]
  minCheck?: number
  maxCheck?: number
  geographies: string[]
  minRevenueArr?: number
  minGrowthYoY?: number
  businessModels: string[]
  portfolio: {
    name: string
    industry: string
    stage?: Stage
    geography?: string
  }[]
  strategicPreferences: string[]
  responseRatePct?: number
  avgResponseHours?: number
  lastActiveAt?: string
  embedding?: number[]
  profileCompleteness: number
}

export interface DimensionScore {
  key: string
  label: string
  score: number
  weight: number
  known: boolean
}

export interface MatchResult {
  investorId: string
  matchScore: number
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  confidenceScore: number
  dimensions: DimensionScore[]
  tier: 'EXCEPTIONAL' | 'STRONG' | 'GOOD' | 'POTENTIAL' | 'LOW'
  reasons: string[]
  concerns: string[]
  investor: InvestorProfile
  isDiscovery: boolean
}
