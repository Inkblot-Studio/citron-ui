import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface AspectRatioProps {
  ratio?: number
  children: ReactNode
  className?: string
}

export function AspectRatio({ ratio = 16 / 9, children, className }: AspectRatioProps) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div style={{ paddingTop: `${(1 / safeRatio) * 100}%` }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
