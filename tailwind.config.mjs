/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#E10600',
      },
      fontFamily: {
        sans: ['Switzer', 'system-ui', 'sans-serif'],
        display: ['Khand', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '960px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'cursor-pulse': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.4)', opacity: '0.25' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.21, 0.62, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'float': 'float 4s ease-in-out infinite',
        'cursor-pulse': 'cursor-pulse 1.6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
