import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form, FormField, FormActions } from './Form'
import { Input } from '../Input'
import { Button } from '../Button'

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[calc(var(--inkblot-size-touch-target-min)*8)]">
      <Form>
        <FormField label="Email" hint="We use this to send updates." requiredIndicator>
          <Input placeholder="name@company.com" />
        </FormField>
        <FormField label="Workspace name">
          <Input placeholder="Citron Ops" />
        </FormField>
        <FormActions>
          <Button variant="secondary">Cancel</Button>
          <Button>Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

export const WithErrorState: Story = {
  render: () => (
    <div className="w-full max-w-[calc(var(--inkblot-size-touch-target-min)*8)]">
      <Form>
        <FormField label="Email" error="Please enter a valid business email." requiredIndicator>
          <Input placeholder="name@company.com" error />
        </FormField>
        <FormActions>
          <Button variant="secondary">Back</Button>
          <Button>Retry</Button>
        </FormActions>
      </Form>
    </div>
  ),
}
