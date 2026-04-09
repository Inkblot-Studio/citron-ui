import type { Meta, StoryObj } from '@storybook/react-vite'
import { InvoiceEditorPage } from './InvoiceEditorPage'
import type { InvoiceClient, InvoiceProduct } from './InvoiceForm'

const sampleClients: InvoiceClient[] = [
  { id: 'c1', name: 'Acme Corp', email: 'billing@acme.com' },
  { id: 'c2', name: 'Globex Inc', email: 'invoices@globex.io' },
  { id: 'c3', name: 'Initech', email: 'ap@initech.com' },
  { id: 'c4', name: 'Umbrella Ltd', email: 'finance@umbrella.co' },
]

const sampleProducts: InvoiceProduct[] = [
  { id: 'p1', name: 'Web Development', unitPrice: 120 },
  { id: 'p2', name: 'UI/UX Design', unitPrice: 95 },
  { id: 'p3', name: 'SEO Audit', unitPrice: 250 },
  { id: 'p4', name: 'Hosting (monthly)', unitPrice: 29.99 },
]

const meta = {
  title: 'Components/InvoiceEditorPage',
  component: InvoiceEditorPage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof InvoiceEditorPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    clients: sampleClients,
    products: sampleProducts,
    onSubmit: (data) => console.log('Submit:', data),
  },
  decorators: [
    (Story) => (
      <div className="w-[800px] bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const Submitting: Story = {
  args: {
    clients: sampleClients,
    products: sampleProducts,
    isSubmitting: true,
    onSubmit: (data) => console.log('Submit:', data),
  },
  decorators: [
    (Story) => (
      <div className="w-[800px] bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
