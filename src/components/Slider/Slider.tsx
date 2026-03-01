import { forwardRef, useMemo } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  onValueChange?: (value: number) => void
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      showValue = true,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const current = value ?? defaultValue ?? min
    const percentage = useMemo(() => {
      if (max <= min) return 0
      return ((current - min) / (max - min)) * 100
    }, [current, min, max])

    return (
      <div className={cn('w-full', className)}>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-[var(--inkblot-semantic-color-text-secondary)]">{min}</span>
          {showValue ? (
            <span className="font-medium text-[var(--inkblot-semantic-color-text-primary)]">{current}</span>
          ) : null}
          <span className="text-[var(--inkblot-semantic-color-text-secondary)]">{max}</span>
        </div>
        <input
          ref={ref}
          type="range"
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => onValueChange?.(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--inkblot-semantic-color-background-tertiary)] disabled:cursor-not-allowed disabled:opacity-[var(--inkblot-opacity-disabled)] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[var(--inkblot-semantic-color-border-default)] [&::-webkit-slider-thumb]:bg-[var(--inkblot-semantic-color-background-secondary)] [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[var(--inkblot-semantic-color-border-default)] [&::-moz-range-thumb]:bg-[var(--inkblot-semantic-color-background-secondary)]"
          style={{
            background: `linear-gradient(to right, var(--inkblot-semantic-color-interactive-primary) 0%, var(--inkblot-semantic-color-interactive-primary) ${percentage}%, var(--inkblot-semantic-color-background-tertiary) ${percentage}%, var(--inkblot-semantic-color-background-tertiary) 100%)`,
          }}
          {...props}
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'
