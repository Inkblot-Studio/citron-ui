import tokens from '@citron-systems/citron-ds/tokens'

type TokenRecord = Record<string, string | number>

const t = tokens as TokenRecord

const spacing: Record<string, string> = {}
;['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32'].forEach((n) => {
  const key = `InkblotSpacing${n}` as keyof TokenRecord
  if (t[key] !== undefined) spacing[n] = String(t[key])
})

const radiusKeys: Record<string, string> = {
  none: 'None',
  sm: 'Sm',
  md: 'Md',
  lg: 'Lg',
  xl: 'Xl',
  '2xl': '2xl',
  full: 'Full',
}
const borderRadius: Record<string, string> = {}
Object.entries(radiusKeys).forEach(([r, suffix]) => {
  const key = `InkblotRadius${suffix}` as keyof TokenRecord
  if (t[key] !== undefined) borderRadius[r] = String(t[key])
})

export const inkblotSpacing = spacing
export const inkblotBorderRadius = borderRadius
