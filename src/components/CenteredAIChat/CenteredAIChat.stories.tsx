import type { Meta, StoryObj } from '@storybook/react-vite'
import { CenteredAIChat, type CenteredAIChatMessage, type CenteredAIChatAgent } from './CenteredAIChat'

const meta = {
  title: 'Components/CenteredAIChat',
  component: CenteredAIChat,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CenteredAIChat>

export default meta

type Story = StoryObj<typeof meta>

const sampleAgents: CenteredAIChatAgent[] = [
  { id: 'general', label: 'General Assistant', description: 'Broad knowledge across all domains' },
  { id: 'sales', label: 'Sales Agent', description: 'Pipeline, deals, and forecasts' },
  { id: 'support', label: 'Support Agent', description: 'Customer issues and tickets' },
]

const fewMessages: CenteredAIChatMessage[] = [
  { id: '1', role: 'user', content: 'What is the current pipeline value?' },
  { id: '2', role: 'assistant', content: 'The current pipeline value across all active deals is $4.2M. This represents a 12% increase from last quarter, driven primarily by 3 new enterprise opportunities added in the last two weeks.' },
  { id: '3', role: 'user', content: 'Which deals are at risk?' },
  { id: '4', role: 'assistant', content: 'There are 2 deals flagged as at-risk:\n\n1. Acme Corp ($450K) — No contact in 14 days, champion left the company.\n2. Globex Inc ($280K) — Budget freeze announced last week, next steps unclear.\n\nI recommend scheduling re-engagement calls for both this week.' },
]

const longConversation: CenteredAIChatMessage[] = [
  { id: '1', role: 'user', content: 'Give me a summary of this week.' },
  { id: '2', role: 'assistant', content: 'This week you closed 2 deals worth a combined $320K, had 14 meetings, and sent 47 emails. Pipeline coverage is at 3.2x against your Q2 target.' },
  { id: '3', role: 'user', content: 'How does that compare to last week?' },
  { id: '4', role: 'assistant', content: 'Last week you closed 1 deal ($95K), had 11 meetings, and sent 38 emails. This week shows strong improvement across all metrics — deals closed up 236%, meetings up 27%, and outreach up 24%.' },
  { id: '5', role: 'user', content: 'What about team performance?' },
  { id: '6', role: 'assistant', content: 'Your team of 6 reps collectively closed $1.1M this week. Top performer is Sarah Chen with $420K across 3 deals. Two reps are below their weekly targets — consider a 1:1 to unblock.' },
  { id: '7', role: 'user', content: "Show me Sarah's deals." },
  { id: '8', role: 'assistant', content: 'Sarah Chen closed 3 deals this week:\n\n1. TechFlow Inc — $180K (Enterprise License)\n2. DataBridge — $140K (Platform Expansion)\n3. NovaSoft — $100K (New Business)\n\nAll moved from negotiation to closed-won within the last 5 business days.' },
  { id: '9', role: 'user', content: 'What is the forecast for next quarter?' },
  { id: '10', role: 'assistant', content: 'Q3 forecast stands at $2.8M based on committed pipeline. Best-case scenario is $3.4M if the 4 deals currently in negotiation close on time. The confidence score is 74%, up from 68% last month.' },
  { id: '11', role: 'user', content: 'Any action items I should prioritize?' },
  { id: '12', role: 'assistant', content: 'Top 3 priorities for this week:\n\n1. Re-engage Acme Corp — their champion left, you need a new contact.\n2. Follow up on Globex budget freeze — check if Q3 budget opens new options.\n3. Review two underperforming reps and schedule coaching sessions.\n\nWould you like me to draft outreach for any of these?' },
]

export const Empty: Story = {
  args: {},
}

export const WithMessages: Story = {
  args: {
    messages: fewMessages,
  },
}

export const WithAgents: Story = {
  args: {
    messages: fewMessages.slice(0, 2),
    agents: sampleAgents,
    activeAgent: 'general',
    onAgentChange: () => {},
  },
}

export const Processing: Story = {
  args: {
    messages: [
      ...fewMessages,
      { id: '5', role: 'user', content: 'Draft a re-engagement email for Acme Corp.' },
    ],
    isProcessing: true,
  },
}

export const LongConversation: Story = {
  args: {
    messages: longConversation,
  },
}
