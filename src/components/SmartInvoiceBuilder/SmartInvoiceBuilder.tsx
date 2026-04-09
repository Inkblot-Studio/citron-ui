import { useState, useRef, useEffect } from 'react'
import { Loader2, Plus, ChevronDown } from 'lucide-react'
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

export interface SmartInvoiceFormData {
  clientId: string
  productId: string
  quantity: number
  paymentMethod: string
  taxType: string
  invoiceType: string
  bankAccount: string
  notes: string
}

export interface SmartInvoiceBuilderProps {
  clients: InvoiceClient[]
  products: InvoiceProduct[]
  paymentMethods?: string[]
  taxTypes?: string[]
  invoiceTypes?: string[]
  bankAccounts?: string[]
  onSubmit?: (data: SmartInvoiceFormData) => void
  onCreateClient?: () => void
  isSubmitting?: boolean
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
  'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]'
)

const labelClass = cn(
  '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
  'text-[var(--inkblot-semantic-color-text-secondary)]'
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = items.find((i) => i.id === value)
  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={open ? query : selected?.name ?? ''}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!open) setOpen(true)
        }}
        onFocus={() => {
          setOpen(true)
          setQuery('')
        }}
        placeholder={placeholder}
        className={cn(inputClass, hasError && !value && errorBorder)}
      />
      {open && (
        <div
          className={cn(
            'absolute z-50 mt-[var(--inkblot-spacing-1)] max-h-48 w-full overflow-auto',
            'rounded-[var(--inkblot-radius-md)] border border-[var(--inkblot-semantic-color-border-default)]',
            'bg-[var(--inkblot-semantic-color-background-primary)] shadow-[var(--inkblot-shadow-sm)]'
          )}
        >
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onChange(item.id)
                setOpen(false)
                setQuery('')
              }}
              className={cn(
                'w-full px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)] text-left',
                '[font:var(--inkblot-semantic-typography-body-small)]',
                'text-[var(--inkblot-semantic-color-text-primary)]',
                'transition-colors duration-[var(--inkblot-duration-fast)]',
                'hover:bg-[var(--inkblot-semantic-color-background-tertiary)]',
                item.id === value && 'bg-[var(--inkblot-semantic-color-background-tertiary)]'
              )}
            >
              {item.name}
            </button>
          ))}
          {filtered.length === 0 && !onCreateNew && (
            <div
              className={cn(
                'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-3)]',
                '[font:var(--inkblot-semantic-typography-body-small)]',
                'text-[var(--inkblot-semantic-color-text-tertiary)]'
              )}
            >
              No results
            </div>
          )}
          {onCreateNew && filtered.length === 0 && (
            <button
              type="button"
              onClick={() => {
                onCreateNew()
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-[var(--inkblot-spacing-2)]',
                'px-[var(--inkblot-spacing-4)] py-[var(--inkblot-spacing-2)]',
                '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
                'text-[var(--inkblot-semantic-color-interactive-primary)]',
                'transition-colors duration-[var(--inkblot-duration-fast)]',
                'hover:bg-[var(--inkblot-semantic-color-background-tertiary)]'
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

function SimpleSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
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
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        className={cn(
          'pointer-events-none absolute right-[var(--inkblot-spacing-3)] top-1/2 h-4 w-4 -translate-y-1/2',
          'text-[var(--inkblot-semantic-color-text-tertiary)]'
        )}
      />
    </div>
  )
}

const DEFAULT_PAYMENT_METHODS = ['Bank Transfer', 'Credit Card', 'Cash', 'Check']
const DEFAULT_TAX_TYPES = ['VAT 21%', 'VAT 10%', 'VAT 0%', 'Exempt']
const DEFAULT_INVOICE_TYPES = ['Standard', 'Proforma', 'Credit Note', 'Debit Note']
const DEFAULT_BANK_ACCOUNTS = ['Main Account', 'Secondary Account']

export function SmartInvoiceBuilder({
  clients,
  products,
  paymentMethods = DEFAULT_PAYMENT_METHODS,
  taxTypes = DEFAULT_TAX_TYPES,
  invoiceTypes = DEFAULT_INVOICE_TYPES,
  bankAccounts = DEFAULT_BANK_ACCOUNTS,
  onSubmit,
  onCreateClient,
  isSubmitting = false,
  className,
}: SmartInvoiceBuilderProps) {
  const [clientId, setClientId] = useState('')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState<number | ''>('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [taxType, setTaxType] = useState('')
  const [invoiceType, setInvoiceType] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [notes, setNotes] = useState('')
  const [attempted, setAttempted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!clientId || !productId || !quantity) return
    onSubmit?.({
      clientId,
      productId,
      quantity: Number(quantity),
      paymentMethod,
      taxType,
      invoiceType,
      bankAccount,
      notes,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-[var(--inkblot-radius-xl)]',
        'bg-[var(--inkblot-semantic-color-background-secondary)]',
        'p-[var(--inkblot-spacing-6)]',
        className
      )}
    >
      <h2
        className={cn(
          '[font:var(--inkblot-semantic-typography-heading-4)]',
          'text-[var(--inkblot-semantic-color-text-primary)]',
          'mb-[var(--inkblot-spacing-6)]'
        )}
      >
        New Invoice
      </h2>

      <div className="grid grid-cols-1 gap-[var(--inkblot-spacing-4)] md:grid-cols-2">
        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <label className={labelClass}>Client</label>
          <SearchableSelect
            items={clients}
            value={clientId}
            onChange={setClientId}
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
            value={productId}
            onChange={setProductId}
            placeholder="Search product..."
            hasError={attempted}
          />
        </div>

        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <label className={labelClass}>Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === '' ? '' : Number(e.target.value))
            }
            placeholder="1"
            className={cn(
              inputClass,
              attempted && !quantity && errorBorder
            )}
          />
        </div>

        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <label className={labelClass}>Payment Method</label>
          <SimpleSelect
            options={paymentMethods}
            value={paymentMethod}
            onChange={setPaymentMethod}
            placeholder="Select..."
          />
        </div>

        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <label className={labelClass}>Tax Type</label>
          <SimpleSelect
            options={taxTypes}
            value={taxType}
            onChange={setTaxType}
            placeholder="Select..."
          />
        </div>

        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <label className={labelClass}>Invoice Type</label>
          <SimpleSelect
            options={invoiceTypes}
            value={invoiceType}
            onChange={setInvoiceType}
            placeholder="Select..."
          />
        </div>

        <div className="flex flex-col gap-[var(--inkblot-spacing-2)]">
          <label className={labelClass}>Bank Account</label>
          <SimpleSelect
            options={bankAccounts}
            value={bankAccount}
            onChange={setBankAccount}
            placeholder="Select..."
          />
        </div>

        <div className="flex flex-col gap-[var(--inkblot-spacing-2)] md:col-span-2">
          <label className={labelClass}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Additional notes..."
            className={cn(inputClass, 'resize-y')}
          />
        </div>
      </div>

      <div className="mt-[var(--inkblot-spacing-6)] flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex min-h-[var(--inkblot-size-touch-target-min)] items-center justify-center gap-[var(--inkblot-spacing-2)]',
            'rounded-[var(--inkblot-radius-lg)]',
            'bg-[var(--inkblot-semantic-color-interactive-primary)]',
            'px-[var(--inkblot-spacing-6)] py-[var(--inkblot-spacing-2)]',
            '[font:var(--inkblot-semantic-typography-body-small)] font-medium',
            'text-[var(--inkblot-semantic-color-text-inverse)]',
            'transition-colors duration-[var(--inkblot-duration-fast)]',
            'hover:bg-[var(--inkblot-semantic-color-interactive-primary-hover)]',
            'active:bg-[var(--inkblot-semantic-color-interactive-primary-active)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--inkblot-semantic-color-border-focus)]',
            'disabled:opacity-[var(--inkblot-opacity-disabled)] disabled:cursor-not-allowed'
          )}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Invoice
        </button>
      </div>
    </form>
  )
}
