export const DEFAULT_WEIGHTS = {
  industry: 0.20,
  stage: 0.15,
  checkSize: 0.15,
  geography: 0.10,
  traction: 0.10,
  thesis: 0.10,
  businessModel: 0.05,
  growth: 0.05,
  strategic: 0.05,
  founderPreference: 0.05,
} as const

export type WeightConfig = Record<keyof typeof DEFAULT_WEIGHTS, number>
export type WeightKey = keyof typeof DEFAULT_WEIGHTS

export function normalizeWeights(weights: Partial<WeightConfig>): WeightConfig {
  const baseWeights = { ...DEFAULT_WEIGHTS, ...weights }
  const total = Object.values(baseWeights).reduce((sum, w) => sum + w, 0)
  
  if (total === 0) return DEFAULT_WEIGHTS
  
  const normalized = {} as WeightConfig
  Object.keys(baseWeights).forEach((key) => {
    normalized[key as WeightKey] = baseWeights[key as WeightKey] / total
  })
  
  return normalized
}
