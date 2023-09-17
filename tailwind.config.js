/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    transitionAll: {
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '1000ms',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'var(--background)',
          border: 'var(--background-border)',
        },
        foreground: 'hsl(var(--foreground))',
        'accent-1': {
          DEFAULT: 'var(--accent-1)',
          foreground: 'var(--accent-1-foreground)',
          hover: 'hsl(var(--accent-1-hover))',
        },
        'like': {
          DEFAULT: 'var(--like)',
          foreground: 'var(--like-foreground)',
          hover: 'var(--like-hover)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          subued: 'hsl(var(--primary-subued))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        navbar: 'var(--navbar-background-color)',
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
        "clamp-title": "clamp(1rem, 5vw, 3rem)",
      },
      height: {
        header: 'var(--height-header)',
        navbar: 'var(--height-navbar)',
      },
      padding: {
        navbar: 'var(--height-navbar)',
      },
      margin: {
        navbar: 'var(--height-navbar)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#fff',
            '--tw-prose-headings': 'var(--accent-1)',
            '--tw-prose-lead': '#fff',
            '--tw-prose-links': '#fff',
            '--tw-prose-bold': '#fff',
            '--tw-prose-counters': '#fff',
            '--tw-prose-bullets': '#fff',
            '--tw-prose-hr': '#fff',
            '--tw-prose-quotes': '#fff',
            '--tw-prose-quote-borders': '#fff',
            '--tw-prose-captions': '#fff',
            '--tw-prose-code': '#fff',
            '--tw-prose-pre-code': '#fff',
            '--tw-prose-pre-bg': '#fff',
            '--tw-prose-th-borders': '#fff',
            '--tw-prose-td-borders': '#fff',
            '--tw-prose-invert-body': '#000',
            '--tw-prose-invert-headings': '#000',
            '--tw-prose-invert-lead': '#000',
            '--tw-prose-invert-links': '#000',
            '--tw-prose-invert-bold': '#000',
            '--tw-prose-invert-counters': '#000',
            '--tw-prose-invert-bullets': '#000',
            '--tw-prose-invert-hr': '#000',
            '--tw-prose-invert-quotes': '#000',
            '--tw-prose-invert-quote-borders': '#000',
            '--tw-prose-invert-captions': '#000',
            '--tw-prose-invert-code': '#000',
            '--tw-prose-invert-pre-code': '#000',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': '#000',
            '--tw-prose-invert-td-borders': '#000',
            // color: '#333',
            // a: {
            //   color: '#3182ce',
            //   '&:hover': {
            //     color: '#2c5282',
            //   },
            // },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')
  ],
};
