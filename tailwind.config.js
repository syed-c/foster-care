/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand color system - Hard locked to specified brand colors
        'brand': {
          'blue': '#2B4593',   // Brand Blue
          'white': '#FFFFFF',   // Brand White
          'black': '#020202',   // Brand Black
        },
        // Ensure no other main colors are used
        // Neutral tints derived from brand colors
        'neutral': {
          50: '#f9f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#b0b0b0',
          500: '#909090',
          600: '#707070',
          700: '#505050',
          800: '#303030',
          900: '#101010'
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
          '0%': { boxShadow: '0 0 0 0 rgba(43, 69, 147, 0.4)' },
          '70%': { boxShadow: '0 0 0 12px rgba(43, 69, 147, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(43, 69, 147, 0)' },
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
            background: 'radial-gradient(circle, rgba(43, 69, 147, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
            transform: 'translate(0, 0)'
          },
          '25%': { 
            background: 'radial-gradient(circle, rgba(43, 69, 147, 0.3) 0%, rgba(2, 2, 2, 0.1) 100%)',
            transform: 'translate(20px, -20px)'
          },
          '50%': { 
            background: 'radial-gradient(circle, rgba(2, 2, 2, 0.3) 0%, rgba(43, 69, 147, 0.1) 100%)',
            transform: 'translate(-20px, 20px)'
          },
          '75%': { 
            background: 'radial-gradient(circle, rgba(43, 69, 147, 0.3) 0%, rgba(2, 2, 2, 0.1) 100%)',
            transform: 'translate(20px, 20px)'
          },
        }
      }
    },
  },
  plugins: [],
};