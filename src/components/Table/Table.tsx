import { forwardRef } from 'react'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)]">
      <table
        ref={ref}
        className={cn('w-full border-collapse bg-[var(--inkblot-semantic-color-background-secondary)]', className)}
        {...props}
      />
    </div>
  )
)

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('bg-[var(--inkblot-semantic-color-background-tertiary)]', className)}
      {...props}
    />
  )
)

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn(className)} {...props} />
)

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-[var(--inkblot-semantic-color-border-default)] text-[var(--inkblot-semantic-color-text-primary)] transition-colors hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
        className
      )}
      {...props}
    />
  )
)

export type TableSortDirection = 'asc' | 'desc'

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: TableSortDirection
  onSort?: () => void
  sortButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable = false, sortDirection, onSort, sortButtonProps, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-left text-sm font-semibold text-[var(--inkblot-semantic-color-text-secondary)]',
        className
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className="inline-flex items-center gap-[var(--inkblot-spacing-1)] rounded-[var(--inkblot-radius-sm)] text-inherit transition-colors duration-[var(--inkblot-duration-fast)] hover:text-[var(--inkblot-semantic-color-text-primary)]"
          {...sortButtonProps}
        >
          {children}
          {sortDirection === 'asc' ? (
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          ) : sortDirection === 'desc' ? (
            <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <ArrowUpDown className="h-3.5 w-3.5" aria-hidden />
          )}
        </button>
      ) : (
        children
      )}
    </th>
  )
)

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 text-sm', className)} {...props} />
  )
)

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('p-3 text-left text-sm text-[var(--inkblot-semantic-color-text-tertiary)]', className)}
      {...props}
    />
  )
)

export interface TableEmptyStateProps extends TdHTMLAttributes<HTMLTableCellElement> {
  colSpan: number
  title?: string
  description?: string
}

export const TableEmptyState = forwardRef<HTMLTableCellElement, TableEmptyStateProps>(
  (
    {
      className,
      colSpan,
      title = 'No data available',
      description = 'Adjust filters or add records to populate this table.',
      ...props
    },
    ref
  ) => (
    <tr>
      <td
        ref={ref}
        colSpan={colSpan}
        className={cn(
          'px-4 py-10 text-center align-middle',
          'text-[var(--inkblot-semantic-color-text-secondary)]',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex max-w-[420px] flex-col gap-[var(--inkblot-spacing-1)]">
          <span className="[font:var(--inkblot-semantic-typography-body-large-bold)] text-[var(--inkblot-semantic-color-text-primary)]">
            {title}
          </span>
          <span className="[font:var(--inkblot-semantic-typography-body-small)]">
            {description}
          </span>
        </div>
      </td>
    </tr>
  )
)

Table.displayName = 'Table'
TableHeader.displayName = 'TableHeader'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableHead.displayName = 'TableHead'
TableCell.displayName = 'TableCell'
TableCaption.displayName = 'TableCaption'
TableEmptyState.displayName = 'TableEmptyState'
