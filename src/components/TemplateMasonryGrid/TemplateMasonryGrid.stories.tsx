import type { Meta, StoryObj } from '@storybook/react-vite'
import { TemplateMasonryGrid } from './TemplateMasonryGrid'
import type { TemplateMasonryItem } from './TemplateMasonryGrid'

const sampleItems: TemplateMasonryItem[] = [
  { id: '1', title: 'Welcome Series', description: 'A multi-step onboarding flow for new users with personalized content.', category: 'Onboarding' },
  { id: '2', title: 'Product Announcement', description: 'Announce new features to your user base.', category: 'Marketing' },
  { id: '3', title: 'Monthly Newsletter', category: 'Newsletter' },
  { id: '4', title: 'Abandoned Cart Recovery', description: 'Re-engage users who left items in their cart with a reminder and discount offer.', category: 'E-commerce' },
  { id: '5', title: 'Event Invitation', description: 'Invite users to webinars or live events.', category: 'Events' },
  { id: '6', title: 'Feedback Request', description: 'Collect user feedback after key interactions.', category: 'Engagement' },
  { id: '7', title: 'Re-engagement Campaign', description: 'Win back inactive users with tailored content.', category: 'Retention' },
  { id: '8', title: 'Seasonal Promotion', category: 'Marketing' },
  { id: '9', title: 'Account Summary', description: 'Weekly digest of account activity and key metrics for power users.', category: 'Reports' },
]

const meta = {
  title: 'Components/TemplateMasonryGrid',
  component: TemplateMasonryGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TemplateMasonryGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const TwoColumns: Story = {
  args: {
    items: sampleItems,
    columns: 2,
  },
}

export const WithAIGenerate: Story = {
  args: {
    items: sampleItems,
    onGenerateWithAI: (item) => console.log('Generate with AI:', item.title),
  },
}
