import { useMemo } from 'react'
import type { HTMLAttributes } from 'react'
import { Toaster, type ToasterItem, type ToasterPosition } from '../Toaster'

export interface SonnerProps extends HTMLAttributes<HTMLDivElement> {
  toasts: ToasterItem[]
  maxVisible?: number
  position?: ToasterPosition
  onDismiss?: (id: string) => void
}

export function Sonner({
  toasts,
  maxVisible = 3,
  position = 'bottom-right',
  onDismiss,
  ...props
}: SonnerProps) {
  const visibleToasts = useMemo(() => toasts.slice(0, maxVisible), [toasts, maxVisible])

  return <Toaster toasts={visibleToasts} position={position} onDismiss={onDismiss} {...props} />
}
