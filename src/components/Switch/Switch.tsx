import { forwardRef, useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, className, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isChecked = checked ?? internalChecked

    const handleToggle = () => {
      if (disabled) return
      const nextChecked = !isChecked
      if (checked === undefined) setInternalChecked(nextChecked)
      onCheckedChange?.(nextChecked)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-[var(--inkblot-duration-fast)] ease-[var(--inkblot-easing-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inkblot-semantic-color-border-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)]',
          isChecked
            ? 'border-[var(--inkblot-semantic-color-interactive-primary)] bg-[var(--inkblot-semantic-color-interactive-primary)]'
            : 'border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-tertiary)]',
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block size-5 rounded-full bg-[var(--inkblot-semantic-color-background-secondary)] transition-transform duration-[var(--inkblot-duration-fast)]',
            isChecked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    )
  }
)

Switch.displayName = 'Switch'
