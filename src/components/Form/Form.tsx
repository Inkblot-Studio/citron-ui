import { forwardRef } from 'react'
import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(
          'grid gap-[var(--inkblot-spacing-4)] rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-5)]',
          className
        )}
        {...props}
      />
    )
  }
)

Form.displayName = 'Form'

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  requiredIndicator?: boolean
}

export function FormField({
  className,
  label,
  hint,
  error,
  children,
  requiredIndicator,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('grid gap-[var(--inkblot-spacing-2)]', className)} {...props}>
      {label ? (
        <p className="text-[var(--inkblot-semantic-color-text-primary)] [font:var(--inkblot-semantic-typography-body-medium)]">
          {label}
          {requiredIndicator ? (
            <span className="ml-[var(--inkblot-spacing-1)] text-[var(--inkblot-semantic-color-status-error)]">
              *
            </span>
          ) : null}
        </p>
      ) : null}
      {children}
      {error ? (
        <p className="text-[var(--inkblot-semantic-color-status-error)] [font:var(--inkblot-semantic-typography-body-small)]">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[var(--inkblot-semantic-color-text-secondary)] [font:var(--inkblot-semantic-typography-body-small)]">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {}

export function FormActions({ className, ...props }: FormActionsProps) {
  return (
    <div
      className={cn(
        'mt-[var(--inkblot-spacing-2)] flex flex-wrap justify-end gap-[var(--inkblot-spacing-3)]',
        className
      )}
      {...props}
    />
  )
}
