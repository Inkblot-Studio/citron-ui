import type { Meta, StoryObj } from '@storybook/react-vite'
import { TemplateCard } from './TemplateCard'

const meta = {
  title: 'Components/TemplateCard',
  component: TemplateCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TemplateCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: 'Onboarding',
    title: 'Welcome Series',
    uses: '34 uses',
  },
  decorators: [
    (Story) => (
      <div className="w-72 bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}

export const Marketing: Story = {
  args: {
    category: 'Marketing',
    title: 'Product Announcement',
    uses: '12 uses',
  },
  decorators: [
    (Story) => (
      <div className="w-72 bg-[var(--inkblot-semantic-color-background-primary)] p-8">
        <Story />
      </div>
    ),
  ],
}
