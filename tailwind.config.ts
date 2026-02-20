import type { Config } from 'tailwindcss'
import { themeTokens } from './src/utils/tokenCleaner'

export default {
  content: [
    './index.html',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/index.ts',
    './src/main.tsx',
    './src/components/**/*.stories.@(js|jsx|ts|tsx)',
    './src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  theme: {
    extend: {
      colors: themeTokens.colors as Record<string, Record<string, string>>,
      fontSize: themeTokens.fontSize as Record<string, string>,
      spacing: themeTokens.spacing as Record<string, string>,
      borderRadius: themeTokens.borderRadius as Record<string, string>,
      fontFamily: {
        sans: ['Inter', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
        display: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.2',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.65',
        loose: '1.8',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
        wider: '0.06em',
      },
    },
  },
  plugins: [],
} satisfies Config
