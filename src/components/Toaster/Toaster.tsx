import type { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Toast, type ToastProps } from '../Toast'

export type ToasterPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface ToasterItem extends ToastProps {
  id: string
}

export interface ToasterProps extends HTMLAttributes<HTMLDivElement> {
  toasts: ToasterItem[]
  position?: ToasterPosition
  onDismiss?: (id: string) => void
}

const positionClass: Record<ToasterPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
}

export function Toaster({
  toasts,
  position = 'bottom-right',
  onDismiss,
  className,
  ...props
}: ToasterProps) {
  return (
    <div
      className={cn('fixed z-50 flex w-full max-w-[360px] flex-col gap-2', positionClass[position], className)}
      {...props}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => onDismiss?.(toast.id)} />
      ))}
    </div>
  )
}
