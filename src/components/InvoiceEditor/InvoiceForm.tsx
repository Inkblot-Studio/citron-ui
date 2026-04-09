import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface InvoiceClient {
  id: string
  name: string
  email?: string
}

export interface InvoiceProduct {
  id: string
  name: string
  unitPrice?: number
}

export interface InvoiceFormData {
  clientId: string
  productId: string
  quantity: number
  paymentMethod: string
  taxType: string
  invoiceType: string
  bankAccount: string
  notes: string
}

export interface InvoiceFormProps {
  clients: InvoiceClient[]
  products: InvoiceProduct[]
  paymentMethods?: string[]
  taxTypes?: string[]
  invoiceTypes?: string[]
  bankAccounts?: string[]
  value?: Partial<InvoiceFormData>
  onChange?: (data: Partial<InvoiceFormData>) => void
  onCreateClient?: () => void
  attempted?: boolean
  className?: string
}

const inputClass = cn(
  'min-h-[var(--inkblot-size-touch-target-min)] w-full rounded-[var(--inkblot-radius-md)]',
  'border border-[var(--inkblot-semantic-color-border-default)]',
  'bg-[var(--inkblot-semantic-color-background-primary)]',
  'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
  '[font:var(--inkblot-semantic-typography-body-small)]',
  'text-[var(--inkblot-semantic-color-text-primary)] placeholder:text-[var(--inkblot-semantic-color-text-tertiary)]',
  'transition-colors duration-[var(--inkblot-duration-fast)]',
  'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]',
)

const labelClass = cn(
  '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
  'text-[var(--inkblot-semantic-color-text-secondary)]',
)

const errorBorder = 'border-[var(--inkblot-semantic-color-status-error)]'

function SearchableSelect<T extends { id: string; name: string }>({
  items,
  value,
  onChange,
  placeholder,
  hasError,
  onCreateNew,
  createNewLabel,
}: {
  items: T[]
  value: string
  onChange: (id: string) => void
  placeholder: string
  hasError?: boolean
  onCreateNew?: () => void
  createNewLabel?: string
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = items.find((i) => i.id === value)
  const filtered = items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={open ? query : selected?.name ?? ''}
        onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true) }}
        onFocus={() => { setOpen(true); setQuery('') }}
        placeholder={placeholder}
        className={cn(inputClass, hasError && !value && errorBorder)}
      />
      {open && (
        <div className={cn(
          'absolute z-50 mt-[var(--inkblot-spacing-1)] max-h-48 w-full overflow-auto',
          'rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)]',
          'bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-sm)]',
        )}>
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { onChange(item.id); setOpen(false); setQuery('') }}
              className={cn(
                'w-full px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-left',
                '[font:var(--inkblot-semantic-typography-body-small)]',
                'text-[var(--inkblot-semantic-color-text-primary)]',
                'transition-colors duration-[var(--inkblot-duration-fast)]',
                'hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
                item.id === value && 'bg-[var(--inkblot-semantic-color-background-tertiary)]',
              )}
            >
              {item.name}
            </button>
          ))}
          {filtered.length === 0 && !onCreateNew && (
            <div className={cn(
              'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
              '[font:var(--inkblot-semantic-typography-body-small)]',
              'text-[var(--inkblot-semantic-color-text-tertiary)]',
            )}>
              No results
            </div>
          )}
          {onCreateNew && filtered.length === 0 && (
            <button
              type="button"
              onClick={() => { onCreateNew(); setOpen(false) }}
              className={cn(
                'flex w-full items-center gap-[var(--inkblot-spacing-2)]',
                'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
                '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
                'text-[var(--inkblot-semantic-color-interactive-primary)]',
                'transition-colors duration-[var(--inkblot-duration-fast)]',
                'hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
              )}
            >
              <Plus className="h-4 w-4" />
              {createNewLabel ?? 'Create new'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function SimpleSelect({ options, value, onChange, placeholder }: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, 'appearance-none pr-[var(--inkblot-spacing-8)]')}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className={cn(
        'pointer-events-none absolute right-[var(--inkblot-spacing-3)] top-1/2 h-4 w-4 -translate-y-1/2',
        'text-[var(--inkblot-semantic-color-text-tertiary)]',
      )} />
    </div>
  )
}

const DEFAULT_PAYMENT_METHODS = ['Bank Transfer', 'Credit Card', 'Cash', 'Check']
const DEFAULT_TAX_TYPES = ['VAT 21%', 'VAT 10%', 'VAT 0%', 'Exempt']
const DEFAULT_INVOICE_TYPES = ['Standard', 'Proforma', 'Credit Note', 'Debit Note']
const DEFAULT_BANK_ACCOUNTS = ['Main Account', 'Secondary Account']

export function InvoiceForm({
  clients,
  products,
  paymentMethods = DEFAULT_PAYMENT_METHODS,
  taxTypes = DEFAULT_TAX_TYPES,
  invoiceTypes = DEFAULT_INVOICE_TYPES,
  bankAccounts = DEFAULT_BANK_ACCOUNTS,
  value = {},
  onChange,
  onCreateClient,
  attempted = false,
  className,
}: InvoiceFormProps) {
  const emit = (partial: Partial<InvoiceFormData>) => onChange?.({ ...value, ...partial })

  return (
    <div className={cn('grid grid-cols-1 gap-[var(--inkblot-spacing-4)] md:grid-cols-2', className)}>
      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Client</label>
        <SearchableSelect
          items={clients}
          value={value.clientId ?? ''}
          onChange={(id) => emit({ clientId: id })}
          placeholder="Search client..."
          hasError={attempted}
          onCreateNew={onCreateClient}
          createNewLabel="+ Create new client"
        />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Product / Service</label>
        <SearchableSelect
          items={products}
          value={value.productId ?? ''}
          onChange={(id) => emit({ productId: id })}
          placeholder="Search product..."
          hasError={attempted}
        />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Quantity</label>
        <input
          type="number"
          min={1}
          value={value.quantity ?? ''}
          onChange={(e) => emit({ quantity: e.target.value === '' ? 0 : Number(e.target.value) })}
          placeholder="1"
          className={cn(inputClass, attempted && !value.quantity && errorBorder)}
        />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Payment Method</label>
        <SimpleSelect options={paymentMethods} value={value.paymentMethod ?? ''} onChange={(v) => emit({ paymentMethod: v })} placeholder="Select..." />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Tax Type</label>
        <SimpleSelect options={taxTypes} value={value.taxType ?? ''} onChange={(v) => emit({ taxType: v })} placeholder="Select..." />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Invoice Type</label>
        <SimpleSelect options={invoiceTypes} value={value.invoiceType ?? ''} onChange={(v) => emit({ invoiceType: v })} placeholder="Select..." />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
        <label className={labelClass}>Bank Account</label>
        <SimpleSelect options={bankAccounts} value={value.bankAccount ?? ''} onChange={(v) => emit({ bankAccount: v })} placeholder="Select..." />
      </div>

      <div className="flex flex-col gap-[var(--inkblot-spacing-2)] md:col-span-2">
        <label className={labelClass}>Notes</label>
        <textarea
          value={value.notes ?? ''}
          onChange={(e) => emit({ notes: e.target.value })}
          rows={3}
          placeholder="Additional notes..."
          className={cn(inputClass, 'resize-y')}
        />
      </div>
    </div>
  )
}
