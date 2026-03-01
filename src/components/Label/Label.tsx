import { forwardRef } from 'react'
import type { LabelHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  requiredIndicator?: boolean
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, requiredIndicator, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'inline-flex items-center gap-[var(--inkblot-spacing-1)] text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-medium)]',
          className
        )}
        {...props}
      >
        {children}
        {requiredIndicator ? (
          <span className="text-[var(--inkblot-semantic-color-status-error)]">*</span>
        ) : null}
      </label>
    )
  }
)

Label.displayName = 'Label'
