import { FounderProfile, InvestorProfile, Stage, DimensionScore } from './types'
import { WeightConfig, DEFAULT_WEIGHTS } from './weights'

const STAGE_ORDER: Stage[] = ['PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C_PLUS']

type DimensionResult = { score: number; known: boolean }

function industryFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!investor.industries?.length) return { score: 0, known: false }
  
  const normalized = (str: string) => str.toLowerCase().trim().replace(/_/g, ' ')
  const founderIndustry = normalized(founder.industry)
  
  // Check excluded industries
  if (investor.excludedIndustries?.some(
    ind => normalized(ind) === founderIndustry
  )) return { score: 0, known: true }
  
  // Direct match
  if (investor.industries.some(ind => normalized(ind) === founderIndustry)) {
    return { score: 1.0, known: true }
  }
  
  // Sub-industry match
  if (founder.subIndustry && investor.subIndustries?.some(
    sub => normalized(sub) === normalized(founder.subIndustry!)
  )) {
    return { score: 0.85, known: true }
  }
  
  // Generalist investor
  if (investor.industries.some(ind => 
    ['generalist', 'agnostic', 'technology'].includes(normalized(ind))
  )) {
    return { score: 0.6, known: true }
  }
  
  // Portfolio adjacency
  const portfolioIndustries = new Set(
    investor.portfolio?.map(p => normalized(p.industry)) || []
  )
  if (portfolioIndustries.has(founderIndustry)) {
    return { score: 0.55, known: true }
  }
  
  return { score: 0.15, known: true }
}

function stageFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!investor.stages?.length) return { score: 0, known: false }
  
  const founderIndex = STAGE_ORDER.indexOf(founder.stage)
  if (founderIndex === -1) return { score: 0, known: false }
  
  const distances = investor.stages.map(s => {
    const investorIndex = STAGE_ORDER.indexOf(s)
    return investorIndex === -1 ? Infinity : Math.abs(investorIndex - founderIndex)
  })
  
  const minDistance = Math.min(...distances)
  
  // Stage distance scoring
  const stageScore = [1.0, 0.65, 0.3, 0.1, 0.0][Math.min(minDistance, 4)]
  return { score: stageScore, known: true }
}

function checkSizeFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!founder.raiseAmount || investor.minCheck == null || investor.maxCheck == null) {
    return { score: 0, known: false }
  }
  
  const raise = founder.raiseAmount
  
  // Too small for the round
  if (investor.maxCheck < raise * 0.02) {
    return { score: 0.1, known: true }
  }
  
  // Too large for the round
  if (investor.minCheck > raise) {
    const ratio = raise / investor.minCheck
    return { score: 0.5 * ratio, known: true }
  }
  
  // Good fit - calculate centering
  const midpoint = (investor.minCheck + investor.maxCheck) / 2
  const ideal = raise * 0.3  // Ideal check size for raising round
  
  const distanceRatio = Math.abs(Math.log10(midpoint / ideal)) / 2
  const centering = Math.max(0, 1 - distanceRatio)
  
  const canLead = investor.maxCheck >= raise * 0.25
  const score = 0.6 * centering + (canLead ? 0.4 : 0.2)
  
  return { score: Math.max(0, Math.min(1, score)), known: true }
}

function geographyFit(founder: FounderProfile, investor: InvestorProfile): DimensionResult {
  if (!investor.geographies?.length) return { score: 0, known: false }
  
  const normalize = (str: string) => str.toLowerCase().trim()
  
  // Global investor
  if (investor.geographies.some(g => normalize(g) === 'global')) {
    return { score: 0.85, known: true }
  }
  
  const founderLocations = new Set([
    ...founder.geography.map(normalize),
    ...(founder.targetMarkets || []).map(normalize)
  ])
  
  const investorLocations = new Set(investor.geographies.map(normalize))
  
  const intersection = new Set(
    [...founderLocations].filter(x => investorLocations.has(x))
  )
  
  if (intersection.size > 0) {
    // HQ match is stronger than target market match
    const hqMatch = founder.geography.some(hq => investor
