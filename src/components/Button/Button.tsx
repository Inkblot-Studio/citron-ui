import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-citron-500 text-neutral-gray-900 hover:bg-accent-citron-600 active:bg-accent-citron-700 focus:ring-2 focus:ring-accent-citron-500 focus:ring-offset-2',
  secondary:
    'bg-neutral-gray-100 text-neutral-gray-900 border border-neutral-gray-200 hover:bg-neutral-gray-200 hover:border-neutral-gray-300 active:bg-neutral-gray-200 focus:ring-2 focus:ring-accent-citron-500 focus:ring-offset-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
