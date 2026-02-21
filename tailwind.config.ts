import type { Config } from 'tailwindcss'
import { inkblotSpacing, inkblotBorderRadius } from './src/utils/inkblotTheme'

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
      spacing: inkblotSpacing,
      borderRadius: inkblotBorderRadius,
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1500ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
