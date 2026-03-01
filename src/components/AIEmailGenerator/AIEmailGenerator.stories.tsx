import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { EmailBlock } from '../EmailBlockEditor'
import { AIEmailGenerator } from './AIEmailGenerator'

const meta = {
  title: 'Components/AIEmailGenerator',
  component: AIEmailGenerator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onGenerate: () => {},
  },
  render: (args) => {
    const [blocks, setBlocks] = useState<EmailBlock[]>([])
    return (
      <div className="w-[560px] space-y-4 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-5">
        <AIEmailGenerator {...args} onGenerate={setBlocks} />
        <div className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3">
          <p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            Generated blocks: {blocks.length}
          </p>
        </div>
      </div>
    )
  },
} satisfies Meta<typeof AIEmailGenerator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSuggestions: Story = {
  args: {
    suggestions: [
      'Write a renewal reminder for enterprise clients',
      'Create a launch email for a limited beta',
      'Draft an internal newsletter for Q2',
    ],
  },
}

export const ControlledState: Story = {
  render: (args) => {
    const [value, setValue] = useState('Write an onboarding email for enterprise leads')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedCount, setGeneratedCount] = useState(0)

    return (
      <div className="w-[560px] space-y-4 rounded-[var(--inkblot-radius-lg)] border border-[var(--inkblot-semantic-color-border-default)] bg-[var(--inkblot-semantic-color-background-primary)] p-5">
        <AIEmailGenerator
          {...args}
          value={value}
          onValueChange={setValue}
          isGenerating={isGenerating}
          onGeneratingChange={setIsGenerating}
          onGenerate={(blocks) => setGeneratedCount(blocks.length)}
        />
        <div className="rounded-[var(--inkblot-radius-md)] bg-[var(--inkblot-semantic-color-background-secondary)] p-3">
          <p className="text-xs text-[var(--inkblot-semantic-color-text-tertiary)]">
            Generated blocks: {generatedCount}
          </p>
        </div>
      </div>
    )
  },
}
