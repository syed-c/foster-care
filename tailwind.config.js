/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-charcoal': '#333333',
        'background-soft': '#f9fafb',
        // New vibrant color palette
        'teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488', // Gradient Teal
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#042f2e',
        },
        'cyan': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Electric Cyan
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Warm Amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'peach': {
          50: '#fff7f0',
          100: '#ffead6',
          200: '#ffd7ae',
          300: '#ffc085',
          400: '#ffa55c',
          500: '#ff8a3d', // Soft Peach
          600: '#f56f2d',
          700: '#e05523',
          800: '#c0421f',
          900: '#9c351d',
        },
        'indigo': {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Indigo Blue
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        'offwhite': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '48px',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-cta': 'pulse-cta 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'ripple': 'ripple 0.6s linear',
        'marquee': 'marquee 25s linear infinite',
        'gradient-orb': 'gradient-orb 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-cta': {
          '0%': { boxShadow: '0 0 0 0 rgba(14, 165, 233, 0.4)' },
          '70%': { boxShadow: '0 0 0 12px rgba(14, 165, 233, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(14, 165, 233, 0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'gradient-orb': {
          '0%, 100%': { 
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.3) 0%, rgba(14, 165, 233, 0.1) 100%)',
            transform: 'translate(0, 0)'
          },
          '25%': { 
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(245, 158, 11, 0.1) 100%)',
            transform: 'translate(20px, -20px)'
          },
          '50%': { 
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(255, 138, 61, 0.1) 100%)',
            transform: 'translate(-20px, 20px)'
          },
          '75%': { 
            background: 'radial-gradient(circle, rgba(255, 138, 61, 0.3) 0%, rgba(13, 148, 136, 0.1) 100%)',
            transform: 'translate(20px, 20px)'
          },
        }
      }
    },
  },
  plugins: [],
}