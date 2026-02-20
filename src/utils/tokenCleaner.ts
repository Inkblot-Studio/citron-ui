import colorTokens from '../tokens/citron-ds/tokens/primitive/color.tokens.json'
import fontTokens from '../tokens/citron-ds/tokens/primitive/typography.tokens.json'
import spacingTokens from '../tokens/citron-ds/tokens/primitive/spacing.tokens.json'
import radiusTokens from '../tokens/citron-ds/tokens/primitive/radius.tokens.json'

type TokenData = Record<string, unknown>

function extractValue(obj: TokenData): unknown {
  if (obj && typeof obj === 'object' && '$value' in obj) {
    const val = obj.$value
    if (Array.isArray(val)) return val[0]
    return val
  }
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue
    const item = obj[key]
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      result[key] = extractValue(item as TokenData)
    }
  }
  return result
}

const colorData = (colorTokens as TokenData).inkblot as TokenData
const fontData = (fontTokens as TokenData).inkblot as TokenData
const spacingData = (spacingTokens as TokenData).inkblot as TokenData
const radiusData = (radiusTokens as TokenData).inkblot as TokenData

export const themeTokens = {
  colors: extractValue(colorData.color as TokenData),
  fontSize: extractValue((fontData.typography as TokenData).fontSize as TokenData),
  spacing: {
    ...(extractValue(spacingData.spacing as TokenData) as Record<string, string>),
    ...(extractValue(spacingData.size as TokenData) as Record<string, unknown>),
  },
  borderRadius: extractValue(radiusData.radius as TokenData),
}
