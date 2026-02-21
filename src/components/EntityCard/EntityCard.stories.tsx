import type { Meta, StoryObj } from '@storybook/react-vite'
import { EntityCard } from './EntityCard'

const meta = {
  title: 'Components/EntityCard',
  component: EntityCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof EntityCard>

export default meta

type Story = StoryObj<typeof meta>

export const Person: Story = {
  args: {
    name: 'Jane Doe',
    entityType: 'Person',
    metadata: { email: 'jane@example.com', role: 'Sales Lead' },
    edges: [{ type: 'WORKS_WITH', target: 'Acme Corp' }, { type: 'MANAGES', target: 'Deal-42' }],
  },
}

export const Organization: Story = {
  args: {
    name: 'Acme Corporation',
    entityType: 'Organization',
    metadata: { industry: 'Technology', employees: '500+' },
    edges: [{ type: 'PARTNER_OF', target: 'Tech Solutions' }],
  },
}

export const Deal: Story = {
  args: {
    name: 'Enterprise License Q4',
    entityType: 'Deal',
    metadata: { value: '$120,000', stage: 'Negotiation' },
    edges: [{ type: 'OWNED_BY', target: 'Jane Doe' }],
  },
}
