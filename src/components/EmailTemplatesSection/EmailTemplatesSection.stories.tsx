import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailTemplatesSection } from './EmailTemplatesSection'

const meta = {
  title: 'Components/EmailTemplatesSection',
  component: EmailTemplatesSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmailTemplatesSection>

export default meta

type Story = StoryObj<typeof meta>

const TEMPLATES = [
  { id: '1', category: 'Onboarding', title: 'Welcome Series', uses: '34 uses' },
  { id: '2', category: 'Marketing', title: 'Product Announcement', uses: '12 uses' },
  { id: '3', category: 'Retention', title: 'Renewal Reminder', uses: '28 uses' },
  { id: '4', category: 'Sales', title: 'Meeting Follow-up', uses: '56 uses' },
]

export const Default: Story = {
  args: {
    templates: TEMPLATES,
    onGenerateWithAI: () => {},
    onTemplateClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--inkblot-semantic-color-background-primary)] p-[var(--inkblot-spacing-8)]">
        <Story />
      </div>
    ),
  ],
}
