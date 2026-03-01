import { forwardRef, useMemo, useRef, useState } from 'react'
import type { ClipboardEvent, HTMLAttributes, InputHTMLAttributes, KeyboardEvent } from 'react'
import { cn } from '../../utils/cn'

export interface InputOtpProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  length?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  containerProps?: HTMLAttributes<HTMLDivElement>
}

export const InputOtp = forwardRef<HTMLDivElement, InputOtpProps>(
  (
    {
      className,
      disabled,
      length = 6,
      value,
      defaultValue = '',
      onValueChange,
      containerProps,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue.slice(0, length))
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const isControlled = value !== undefined
    const currentValue = isControlled ? value.slice(0, length) : internalValue

    const slots = useMemo(() => {
      return Array.from({ length }, (_, index) => currentValue[index] ?? '')
    }, [currentValue, length])

    const updateValue = (nextValue: string) => {
      const normalized = nextValue.slice(0, length)
      if (!isControlled) {
        setInternalValue(normalized)
      }
      onValueChange?.(normalized)
    }

    const focusAt = (index: number) => {
      const target = inputRefs.current[index]
      target?.focus()
      target?.select()
    }

    const handleDigitChange = (index: number, rawValue: string) => {
      const digit = rawValue.replace(/[^0-9A-Za-z]/g, '').slice(0, 1)
      const next = slots.map((slot, slotIndex) =>
        slotIndex === index ? digit : slot
      )
      updateValue(next.join(''))
      if (digit && index < length - 1) {
        focusAt(index + 1)
      }
    }

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace' && !slots[index] && index > 0) {
        const next = slots.map((slot, slotIndex) =>
          slotIndex === index - 1 ? '' : slot
        )
        updateValue(next.join(''))
        focusAt(index - 1)
      }
      if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault()
        focusAt(index - 1)
      }
      if (event.key === 'ArrowRight' && index < length - 1) {
        event.preventDefault()
        focusAt(index + 1)
      }
    }

    const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault()
      const pasted = event.clipboardData
        .getData('text')
        .replace(/[^0-9A-Za-z]/g, '')
        .slice(0, length)
      if (!pasted) {
        return
      }
      updateValue(pasted)
      focusAt(Math.min(pasted.length, length - 1))
    }

    return (
      <div
        ref={ref}
        onPaste={handlePaste}
        className={cn(
          'flex items-center gap-[var(--inkblot-spacing-2)]',
          className,
          containerProps?.className
        )}
        {...containerProps}
      >
        {slots.map((slot, index) => (
          <input
            key={`otp-slot-${index}`}
            ref={(element) => {
              inputRefs.current[index] = element
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={slot}
            disabled={disabled}
            onChange={(event) => handleDigitChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className={cn(
              'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)]',
              'bg-[var(--inkblot-semantic-color-background-secondary)] px-[var(--inkblot-spacing-3)] py-[var(--inkblot-spacing-2)]',
              'text-center text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-heading-small)]',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--inkblot-semantic-color-border-focus)] focus-visible:outline-offset-2',
              'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:pointer-events-none'
            )}
            {...props}
          />
        ))}
      </div>
    )
  }
)

InputOtp.displayName = 'InputOtp'
