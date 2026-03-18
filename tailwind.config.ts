import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        discovery: {
          primary: '#1D7FE5',
          'primary-content': '#FFFFFF',
          secondary: '#34D399',
          'secondary-content': '#1F2937',
          accent: '#20C997',
          'accent-content': '#1F2937',
          neutral: '#0F2A44',
          'neutral-content': '#F9FAFB',
          'base-100': '#FFFFFF',
          'base-200': '#F8FCFF',
          'base-300': '#ECFDF5',
          'base-content': '#1F2937',
          info: '#0EA5E9',
          'info-content': '#082F49',
          success: '#10B981',
          'success-content': '#052E16',
          warning: '#FACC15',
          'warning-content': '#422006',
          error: '#EF4444',
          'error-content': '#FEE2E2',
        },
      },
    ],
    darkTheme: false,
  },
}

export default config
