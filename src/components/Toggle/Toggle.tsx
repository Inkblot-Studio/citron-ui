import { useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export type ToggleSize = 'sm' | 'md' | 'lg'
export type ToggleVariant = 'default' | 'outline'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  size?: ToggleSize
  variant?: ToggleVariant
}

const sizeClass: Record<ToggleSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
}

export function Toggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  size = 'md',
  variant = 'default',
  disabled,
  className,
  children,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed)
  const isPressed = pressed ?? internalPressed

  const handleToggle = () => {
    if (disabled) return
    const nextPressed = !isPressed
    if (pressed === undefined) setInternalPressed(nextPressed)
    onPressedChange?.(nextPressed)
  }

  return (
    <button
      type="button"
      aria-pressed={isPressed}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center rounded-[var(--inkblot-radius-md)] border font-medium transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
        sizeClass[size],
        variant === 'default'
          ? isPressed
            ? 'border-[var(--inkblot-semantic-color-interactive-primary)] bg-[var(--inkblot-semantic-color-interactive-primary)] text-[var(--inkblot-semantic-color-text-inverse)]'
            : 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-secondary)] text-[var(--inkblot-semantic-color-text-primary)] hover:bg-[var(--inkblot-semantic-color-background-tertiary)]'
          : isPressed
            ? 'border-[var(--inkblot-semantic-color-text-primary)] bg-[var(--inkblot-semantic-color-background-tertiary)] text-[var(--inkblot-semantic-color-text-primary)]'
            : 'border-[var(--inkblot-semantic-color-border-default)] bg-transparent text-[var(--inkblot-semantic-color-text-secondary)] hover:text-[var(--inkblot-semantic-color-text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
