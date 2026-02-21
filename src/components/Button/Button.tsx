import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)] active:bg-[var(--inkblot-semantic-color-interactive-primary-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2 disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none disabled:cursor-not-allowed',
  secondary:
    'bg-[var(--inkblot-semantic-color-interactive-secondary)] text-[var(--inkblot-semantic-color-text-primary)] border border-[var(--inkblot-semantic-color-border-default)] hover:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] hover:border-[var(--inkblot-semantic-color-border-strong)] active:bg-[var(--inkblot-semantic-color-interactive-secondary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2 disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none disabled:cursor-not-allowed',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-lg)] px-4 py-2 font-semibold transition-[background,border-color] duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)]',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
