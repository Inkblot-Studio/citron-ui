import { forwardRef, useState } from 'react'
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface RadioGroupOption {
  value: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioGroupOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      onValueChange,
      name = 'radio-group',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const isControlled = value !== undefined
    const selectedValue = isControlled ? value : internalValue

    const setValue = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    }

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn('grid gap-[var(--inkblot-spacing-2)]', className)}
        {...props}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-start gap-[var(--inkblot-spacing-3)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] p-[var(--inkblot-spacing-3)]',
              'bg-[var(--inkblot-semantic-color-background-primary)] hover:bg-[var(--inkblot-semantic-color-background-secondary)]',
              option.disabled && 'pointer-events-none opacity-[var(--inkblot-opacity-disabled)]'
            )}
          >
            <RadioGroupItem
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              disabled={option.disabled}
              onChange={() => setValue(option.value)}
            />
            <span className="grid gap-[var(--inkblot-spacing-1)]">
              <span className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-medium)]">
                {option.label}
              </span>
              {option.description ? (
                <span className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps extends InputHTMLAttributes<HTMLInputElement> {}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'mt-[var(--inkblot-spacing-1)] h-[var(--inkblot-spacing-4)] w-[var(--inkblot-spacing-4)] border-[var(--inkblot-semantic-color-border-default)] text-[var(--inkblot-semantic-color-interactive-primary)]',
          className
        )}
        {...props}
      />
    )
  }
)

RadioGroupItem.displayName = 'RadioGroupItem'
